import boto3
from dotenv import dotenv_values

config = dotenv_values('.env')

s3_client = boto3.client('s3',
                         aws_access_key_id=config['AWS_ACCESS_KEY_ID'],
                         aws_secret_access_key=config['AWS_SECRET_ACCESS_KEY']
                         )



