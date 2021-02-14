FROM node:14.7 as frontent-build
ENV NG_CLI_ANALYTICS false
ARG ENVIRONMENT
WORKDIR /app
COPY 	./ ./
RUN npm --registry http://nexus:8081/repository/npm-group/ install -g @angular/cli
RUN	sh ./build.sh

FROM nginx:1.14.1-alpine
COPY --from=frontent-build /app/dist/faustyna-front /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN echo "mainFileName=\"\$(ls /usr/share/nginx/html/main*.js)\" && \
          envsubst '\$FAUSTYNA_API_SERVER \$FAUSTYNA_HOME_COMPONENT_PATH \$FAUSTYNA_APP_PATH ' < \${mainFileName} > main.tmp && \
          mv main.tmp  \${mainFileName} && \
          confFileName=\"/etc/nginx/conf.d/default.conf\" && \
          envsubst '\$FAUSTYNA_NGINX_APP_LOCATION \$FAUSTYNA_NGINX_BACKEND_LOCATION \$FAUSTYNA_NGINX_BACKEND_URL ' < \${confFileName} > main.tmp && \
          mv main.tmp  \${confFileName} && \
          nginx -g 'daemon off;'" > run.sh

ENTRYPOINT ["sh", "run.sh"]

