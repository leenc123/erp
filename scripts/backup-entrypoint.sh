#!/bin/sh

# 安装必要的软件
apk add --no-cache mysql-client bash curl dcron

# 等待数据库启动
echo "等待数据库启动..."
sleep 30

# 测试数据库连接
echo "测试数据库连接..."
counter=0
max_attempts=12
echo "password is ${MYSQL_ROOT_PASSWORD}"
while [ $counter -lt $max_attempts ]; do
    if mysql -h db -u root -p"${MYSQL_ROOT_PASSWORD}" -e "SELECT 1" 2>/dev/null; then
        echo "数据库连接成功！"
        break
    fi
    echo "等待数据库... ($((counter+1))/$max_attempts)"
    sleep 5
    counter=$((counter+1))
done

if [ $counter -eq $max_attempts ]; then
    echo "警告：无法连接到数据库，但继续执行..."
fi
# 确保备份脚本有执行权限
echo "设置备份脚本权限..."
chmod +x /scripts/backup.sh
# 创建定时任务
echo "创建定时备份任务..."
mkdir -p /etc/periodic/daily
cat > /etc/periodic/daily/backup << 'EOF'
#!/bin/sh
/scripts/backup.sh daily
EOF
chmod +x /etc/periodic/daily/backup

# 立即执行一次备份
echo "执行首次备份..."
/scripts/backup.sh daily

# 启动crond
echo "启动定时任务服务..."
crond -f -l 8
