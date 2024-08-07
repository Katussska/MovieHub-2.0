# nginx - web server
FROM bitnami/nginx:latest

COPY build /app

COPY ./nginx.conf /opt/bitnami/nginx/conf/server_blocks/my_server_block.conf
