import json
import boto3
import csv
s3 = boto3.client('s3')

def lambda_handler(event, context):
    bucket_name = 'ikkohquiz'
    list_name = "quizlist.csv"
    group = event["group"]
    
    try:
        # group="0" の場合はgrouplist.csvからグループ一覧を返す
        if group == "0":
            resp = s3.get_object(Bucket=bucket_name, Key='grouplist.csv')
            content = resp['Body'].read().decode('utf-8-sig').splitlines()
            reader = csv.DictReader(content)
            groups = [row for row in reader]
            return {
                'statusCode': 200,
                'body': json.dumps(groups)
            }

        # S3からファイルを取得
        response = s3.get_object(Bucket=bucket_name, Key=list_name)
        content = response['Body'].read().decode('utf-8-sig').splitlines()

        # CSVをJSONに変換
        reader = csv.DictReader(content)
        quiz_list = [row for row in reader]

        #groupに一致するものだけを抽出
        quiz_list = [q for q in quiz_list if q['group'] == group]
        
        #画像のfile名をpresignedURLに置き換える
        for q in quiz_list:
            for key in ('image', 'qimage'):
                if q.get(key):
                    filename = q[key]
                    s3_key = f"images/{filename}" if filename.lower().endswith('.png') else filename
                    q[key] = s3.generate_presigned_url(
                        'get_object',
                        Params={'Bucket': bucket_name, 'Key': s3_key},
                        ExpiresIn=3600  # 1時間 (3600秒)
                    )

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }

    return {
        'statusCode': 200,
        'body': json.dumps(quiz_list)
    }