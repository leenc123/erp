# 安装前端依赖
FROM node:22.19.0-alpine
# 设置工作目录
WORKDIR /app
# 安装前端环境


CMD npm config set registry https://registry.npmmirror.com/ && \
        npm config set ignore-engines true && \
        npm install -g yarn && \
        yarn install && \
        yarn build