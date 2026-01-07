# 安装前端依赖
FROM node:22.19.0-alpine
# 设置工作目录
WORKDIR /app
# 安装前端环境
CMD npm config set registry https://registry.npmmirror.com/ && \
        yarn config set ignore-engines true && \
        if ! command -v yarn &> /dev/null; then npm install -g yarn; fi && \
        yarn install && \
        yarn build