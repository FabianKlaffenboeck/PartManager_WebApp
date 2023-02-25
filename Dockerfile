FROM nginx:1.17.1-alpine
COPY dist/part-manager-web-app /usr/share/nginx/html
EXPOSE 80
