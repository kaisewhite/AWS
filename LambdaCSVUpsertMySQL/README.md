# Use AWS Lambda to read data from a CSV file in an S3 Bucket

In this solution we are going to use AWS Lambda to read a CSV file located in and S3 bucket and upsert the data into a MySQL instance hosted in RDS.

There are two prerequisites to this.

1. Create and store MySQL credentials in AWS Secret Manager.
2. Create a policy which allows the Lambda role to access Secrets Manager

### How to read secrets from AWS Secret Manager

You should never hard code your credentials in a script so we are going to pull the credentials for our RDS instance from Secrets Manager.
Prior to this I went into the AWS console/Secrets Manager and created a secret with four keys. In the snippet below we will reference each key.

```
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
        SecretId='REPLACE WITH SECRET NAME')
    mysql_params = json.loads(response["SecretString"])
    pprint.pprint(mysql_params)
    return mysql_params
```

### Make sure your Lambda role has the proper permissions to access the secret.

Here's the JSON I used to create a policy and attached it to my Lambda role.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "secretsmanager:GetResourcePolicy",
                "secretsmanager:GetSecretValue",
                "secretsmanager:DescribeSecret",
                "secretsmanager:ListSecretVersionIds"
            ],
            "Resource": "arn:aws:secretsmanager:*:123456789:secret:*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "secretsmanager:GetRandomPassword",
                "secretsmanager:ListSecrets"
            ],
            "Resource": "*"
        }
    ]
}
```
