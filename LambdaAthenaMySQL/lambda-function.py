import boto3
import io
import re
import time
import csv
import sys
import logging
import json
import pprint
# import rds_config
import pymysql
# from urlparse import urlparse
# import mysql.connector

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def open_mysql_connection(mysql_params): 
  mysql_conn = None
  try: 
    mysql_conn =  pymysql.connect(mysql_params["rds_host"], user=mysql_params["username"], passwd = mysql_params["password"], db = mysql_params["schema"], connect_timeout=5)
  except pmysql.MySQLError as e: 
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit()
  return mysql_conn;
    
def read_mysql_config_from_secrets_manager():
  secretsmanager_client = boto3.client('secretsmanager')
  response = secretsmanager_client.get_secret_value(
    SecretId='GrafanaMySQLSchemaAndPassword'
  )
  mysql_params = json.loads(response["SecretString"])
  pprint.pprint(mysql_params)
  return mysql_params

def athena_query(client, params):
  response = client.start_query_execution(
    QueryString=params["query"],
    QueryExecutionContext={
      'Database': params['database']
    },
    ResultConfiguration={
      'OutputLocation': 's3://' + params['bucket'] + '/' + params['path']
    }
  )
  return response

def athena_to_s3(params, max_execution = 90):
  session = boto3.Session()
  client = session.client('athena', region_name=params["region"])
  execution = athena_query(client, params)
  execution_id = execution['QueryExecutionId']
  state = 'RUNNING'
  while (max_execution > 0 and state in ['RUNNING', 'QUEUED']):
    max_execution = max_execution - 1
    response = client.get_query_execution(QueryExecutionId = execution_id)
    if 'QueryExecution' in response and \
        'Status' in response['QueryExecution'] and \
        'State' in response['QueryExecution']['Status']:
      state = response['QueryExecution']['Status']['State']
      # print (response)
      if state == 'FAILED':
        return False
      elif state == 'SUCCEEDED':
        s3_path = response['QueryExecution']['ResultConfiguration']['OutputLocation']
        # filename = re.findall('.\/(.)', s3_path)[0]
        return s3_path
    time.sleep(1)

  #     csv_data = csv.reader(file(filename))
  # conn = mysql.connector.connect(user='user', password='password', host='aurora_endpoint', database='alb_metrics')
  # cursor = conn.cursor()
  # for row in csv_data:
  #     cursor.execute('INSERT INTO ALB_LOGS_PROD(REQUEST_URL)' \
  #         'VALUES("%s")'
  #         row)
  return False

def split_s3_path(s3_path):
  path_parts=s3_path.replace("s3://","").split("/")
  bucket=path_parts.pop(0)
  key="/".join(path_parts)
  return bucket, key

def load_csv_from_s3_insert_into_mysql(s3_path, mysql_conn):
  s3_client = boto3.client('s3')
  bucket, key = split_s3_path(s3_path)
  print(bucket)
  print(key)
  s3_client.download_file(bucket, key, '/tmp/query_result.csv')

  cur = mysql_conn.cursor()
  
  csvfile = open('/tmp/query_result.csv')
  records = csv.DictReader(csvfile)
  for row in records:
    # print (row)
    sql_upsert_statement =  f"""insert into alb_metric_ranges values ('{row["minute_window"]}','{row["environment"]}',{row["environment_id"]},'{row["request_verb"]}',
{row["Over_Twenty"]}, {row["Zero_to_Five"]}, {row["Five_to_Ten"]}, {row["Ten_to_Twenty"]}
)
ON DUPLICATE KEY UPDATE Over_Twenty={row["Over_Twenty"]}, Zero_to_Five={row["Zero_to_Five"]}, 
Five_to_Ten={row["Five_to_Ten"]}, Ten_to_Twenty={row["Ten_to_Twenty"]};
"""
    # print(sql_upsert_statement)
    cur.execute(sql_upsert_statement)
  mysql_conn.commit()
  cur.close()
      

def lambda_handler(event, context):
  athena_params = {
    'region': 'us-east-1',
    'database': 'lcheng_elb_test',
    'bucket': 'csbs-athena-query-results',
    'path':  'automation'
  }
  query_sandbox = 'select * from sandbox_alb_metric_grouped_by_range;'
  query_nonprod = 'select * from nonprod_alb_metric_grouped_by_range;'
  query_preprod = 'select * from preprod_alb_metric_grouped_by_range;'
  query_prod = 'select * from prod_alb_metric_grouped_by_range;'
  
  mysql_params = {}
  mysql_params = read_mysql_config_from_secrets_manager()
  mysql_conn = open_mysql_connection(mysql_params)
  
  #update sandbox information
  athena_params["query"] = query_sandbox
  s3_path = athena_to_s3(athena_params)
  load_csv_from_s3_insert_into_mysql(s3_path, mysql_conn)
  
  #update nonprod information
  athena_params["query"] = query_nonprod
  s3_path = athena_to_s3(athena_params)
  load_csv_from_s3_insert_into_mysql(s3_path, mysql_conn)
  
  #update preprod information
  athena_params["query"] = query_preprod
  s3_path = athena_to_s3(athena_params)
  load_csv_from_s3_insert_into_mysql(s3_path, mysql_conn)
  
  #update prod information
  athena_params["query"] = query_prod
  s3_path = athena_to_s3(athena_params)
  load_csv_from_s3_insert_into_mysql(s3_path, mysql_conn)
  
  mysql_conn.close();
