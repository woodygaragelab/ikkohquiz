FROM public.ecr.aws/lambda/python:3.12

# 依存ライブラリがある場合はここでインストール
# COPY requirements.txt .
# RUN pip install -r requirements.txt --no-cache-dir

# アプリケーションコードをコピー
COPY lambda_function.py ${LAMBDA_TASK_ROOT}/

RUN pip install requests

CMD ["lambda_function.lambda_handler"]
