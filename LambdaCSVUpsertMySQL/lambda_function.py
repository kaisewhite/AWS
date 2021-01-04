import boto3
import io
import re
import time
import csv
import sys
import logging
import json
import pprint
import pymysql
import uuid
from urllib.parse import urlparse
from urllib.parse import unquote

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Create a connection to the MySQL DB

# def open_mysql_connection_hardcoded():
#    mysql_conn = None
#    try:
#        mysql_conn = pymysql.connect(host="AWSCONNECTIONSTRING", user="REPLACEME",
#                                     passwd="REPLACEME", db="REPLACEME", connect_timeout=5)
#    except pymysql.MySQLError as e:
#        logger.error(
#            "ERROR: Unexpected error: Could not connect to MySQL instance.")
#        logger.error(e)
#        sys.exit()
#    return mysql_conn


def open_mysql_connection(mysql_params):
    mysql_conn = None
    try:
        mysql_conn = pymysql.connect(mysql_params["rds_host"],
                                     user=mysql_params["username"],
                                     passwd=mysql_params["password"],
                                     db=mysql_params["schema"],
                                     connect_timeout=5)
    except pymysql.MySQLError as e:
        logger.error(
            "ERROR: Unexpected error: Could not connect to MySQL instance.")
        logger.error(e)
        sys.exit()
    return mysql_conn


def read_mysql_config_from_secrets_manager():
    secretsmanager_client = boto3.client('secretsmanager')
    response = secretsmanager_client.get_secret_value(
        SecretId='GrafanaMySQLSchemaAndPassword')
    mysql_params = json.loads(response["SecretString"])
    pprint.pprint(mysql_params)
    return mysql_params


def num_or_null(field) -> str:
    if (field.isnumeric()):
        return repr(field)
    else:
        return 'NULL'


def load_csv_from_s3_insert_into_mysql(event, mysql_conn):
    s3_client = boto3.client('s3')

    bucket_name = event["Records"][0]["s3"]["bucket"]["name"]
    s3_file_name = event["Records"][0]["s3"]["object"]["key"]
    # parse_result = urlparse(s3_file_name)
    s3_file_name = unquote(s3_file_name)
    # download_path = '/tmp/{}{}'.format(uuid.uuid4(), s3_file_name)
    print('s3_file_name: {}'.format(s3_file_name))
    # download_path = '/tmp/{}'.format(s3_file_name)
    download_path = '/tmp/transcations.csv'
    s3_client.download_file(bucket_name, s3_file_name, download_path)

    print(bucket_name)
    print(s3_file_name)

    cur = mysql_conn.cursor()

    csvfile = open(download_path)
    records = csv.DictReader(csvfile)
    row_count = 0
    for row in records:
        # print (row)
        # timestamp=
        # response_code, {row["responseCode"]},
        # response_message, repr(row["responseMessage"])},
        # verify the type of input:
        # response_code needs to be an int, if not, enter null,
        sql_upsert_statement = f"""insert into alfresco_automated_testing_result (time_stamp,elapsed,label,response_code,response_message,idle_time) 
values (
'{row["timeStamp"]}',
{row["elapsed"]},
{repr(row["label"])},
{num_or_null(row["responseCode"])},
{repr(row["responseMessage"])},
{num_or_null(row["IdleTime"])}
)"""
        # print(sql_upsert_statement)
        cur.execute(sql_upsert_statement)
        row_count = row_count + 1
    mysql_conn.commit()
    cur.close()
    print('rows inserted: {}'.format(row_count))


def lambda_handler(event, context):

    mysql_params = {}
    mysql_params = read_mysql_config_from_secrets_manager()
    mysql_conn = open_mysql_connection(mysql_params)
    #mysql_conn = open_mysql_connection_hardcoded()

    # update sandbox information
    load_csv_from_s3_insert_into_mysql(event, mysql_conn)

    mysql_conn.close()
