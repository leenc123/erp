# 1. 检查项目配置
python manage.py check
# 2. 创建迁移文件（如果修改了模型）
python manage.py makemigrations
# 3. 应用迁移到数据库
python manage.py migrate
# 4. 启动服务器
python manage.py runserver