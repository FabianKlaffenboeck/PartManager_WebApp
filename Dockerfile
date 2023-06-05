FROM nginx:1.17.1-alpine
COPY dist/part-manager-web-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
