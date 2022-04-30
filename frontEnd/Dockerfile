
FROM node:14-alpine as build
WORKDIR /app
COPY frontEnd/package.json .
RUN npm install
COPY frontEnd .
RUN npm run build

FROM nginx
COPY --from=build /app/dist/gitlab-stats /usr/share/nginx/html
COPY frontEnd/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 4200 80
CMD ["nginx", "-g", "daemon off;"]







#----------------------- this version works for local dev container -------------------------------------


#FROM node:14-alpine as build
#WORKDIR /app
#COPY package.json .
#RUN npm install
#COPY . .
#RUN npm run build
#
#FROM nginx
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=build /app/dist/gitlab-stats /usr/share/nginx/html
#EXPOSE 4200 80
#CMD ["nginx", "-g", "daemon off;"]
