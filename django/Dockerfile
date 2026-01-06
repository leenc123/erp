FROM python:3.9-slim

# 设置工作目录
WORKDIR /app

# 解决arm架构下mysqlclient安装问题
# 设置时区 
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
# 1. 先更新 apt 并安装系统依赖（包括 MySQL 开发库）
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    pkg-config \
    default-libmysqlclient-dev \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# 复制项目文件
COPY . /app

# 安装Python依赖和其他必要工具
RUN pip install --no-cache-dir -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple && \
    apt update && \
    apt install -y netcat-openbsd && \
    chmod 777 /app/logs/debug.log /app/logs/error.log /app/logs/uWSGI.log && \
    touch /app/logs/debug.log /app/logs/error.log /app/logs/uWSGI.log && \
    chmod 777 /app/scripts/init_data.sh && \
    sed -i 's/\r//' ./start.sh && \
    chmod +x ./start.sh

# 设置 Python 环境变量
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# 暴露端口
EXPOSE 8000

# 启动命令
CMD ["/bin/bash", "-c", "[ ! -f /app/initialized ] && /app/scripts/init_data.sh; /bin/bash /app/start.sh"]
