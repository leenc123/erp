#!/bin/bash
# 配置
MYSQL_HOST="db"
MYSQL_USER="root"
MYSQL_PASSWORD="${MYSQL_ROOT_PASSWORD}"
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
KEEP_DAYS=7
# 创建备份目录
mkdir -p $BACKUP_DIR
echo "=== 开始备份: $(date) ==="
# 备份所有数据库
mysqldump \
  -h$MYSQL_HOST \
  -u$MYSQL_USER \
  -p$MYSQL_PASSWORD \
  --all-databases \
  --single-transaction \
  --routines \
  --triggers \
  --events \
  --result-file=$BACKUP_DIR/full_backup_${DATE}.sql
# 压缩备份文件
gzip $BACKUP_DIR/full_backup_${DATE}.sql
# 备份状态
if [ $? -eq 0 ]; then
    echo "✓ 备份成功: full_backup_${DATE}.sql.gz"
    
    # 清理旧备份
    find $BACKUP_DIR -name "*.sql.gz" -mtime +$KEEP_DAYS -delete
    echo "✓ 清理了 $KEEP_DAYS 天前的备份"
else
    echo "✗ 备份失败"
    exit 1
fi
echo "=== 备份完成: $(date) ==="