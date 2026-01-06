# nginx镜像compose/nginx/Dockerfile

FROM nginx:alpine

# 检查 www-data 用户和组是否已存在，如果不存在则创建
RUN if ! getent group www-data >/dev/null; then \
        addgroup -g 33 -S www-data; \
    fi && \
    if ! getent passwd www-data >/dev/null; then \
        adduser -u 33 -S www-data -G www-data; \
    fi


# 删除原有配置文件，创建静态资源文件夹和ssl证书保存文件夹
RUN rm /etc/nginx/conf.d/default.conf \
&& mkdir -p /usr/share/nginx/html/static \
&& mkdir -p /usr/share/nginx/html/media \
&& mkdir -p /usr/share/nginx/ssl

# 设置Media文件夹用户和用户组为Linux默认www-data, 并给予可读和可执行权限,
# 否则用户上传的图片无法正确显示。
RUN chown -R www-data:www-data /usr/share/nginx/html/media \
&& chmod -R 775 /usr/share/nginx/html/media

# 添加配置文件
ADD ./nginx.conf /etc/nginx/conf.d/

# 关闭守护模式
CMD ["nginx", "-g", "daemon off;"]
