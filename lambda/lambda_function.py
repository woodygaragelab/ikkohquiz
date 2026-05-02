import json
import boto3
import csv
import os
s3 = boto3.client('s3')

def lambda_handler(event, context):
    bucket_name = 'ikkohquiz'
    list_name = "quizlist.csv"
    group = event["group"]
    print(group)
    
    try:
        # S3からファイルを取得
        response = s3.get_object(Bucket=bucket_name, Key=list_name)
        content = response['Body'].read().decode('utf-8-sig').splitlines()

        # CSVをJSONに変換
        reader = csv.DictReader(content)
        quiz_list = [row for row in reader]

        # group="0" の場合はグループ一覧を返す
        if group == "0":
            groups = sorted(set(q['group'] for q in quiz_list))
            return {
                'statusCode': 200,
                'body': json.dumps(groups)
            }

        #groupに一致するものだけを抽出
        quiz_list = [q for q in quiz_list if q['group'] == group]

        #画像のfile名をpresignedURLに置き換える
        for q in quiz_list:
            file_name = q['image']
            # presigned URLを生成（GET用）
            presigned_url = s3.generate_presigned_url(
                'get_object',
                Params={'Bucket': bucket_name, 'Key': file_name},
                ExpiresIn=3600  # 1時間 (3600秒)
            )
            q['image'] = presigned_url

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }

    return {
        'statusCode': 200,
        'body': json.dumps(quiz_list)
    }