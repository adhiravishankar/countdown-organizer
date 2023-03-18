from s3 import s3_client


def upload_file_to_s3(file, bucket_name, file_name, mime_type):
    try:
        s3_client.upload_fileobj(
            file,
            bucket_name,
            file_name,
            ExtraArgs={
                "ACL": "public-read",
                "ContentType": mime_type
            }
        )
    except Exception as e:
        print("Something Happened: ", e)
        return e
    return "{}: {}".format(bucket_name, file_name)
