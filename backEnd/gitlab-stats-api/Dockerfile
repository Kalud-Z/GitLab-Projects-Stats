FROM node:10
WORKDIR /app

#this format works for deploying on GitLab.
COPY /backEnd/gitlab-stats-api/package.json ./

RUN npm install

#this format works for deploying on GitLab.
COPY /backEnd/gitlab-stats-api .


RUN npm run build
CMD ["npm", "run", "start:prod"]














#____________________________________________ old code : when we used to use migration files____________________
#FROM node:12
#
#WORKDIR /kalud/src/app
#
##COPY package*.json ./
#COPY package.json ./
#
#RUN npm install
#
#COPY . .
#
##RUN npm run migrate:generate
##RUN npm run migrate:run
#
#CMD [ "npm", "run" , "start:docker" ]
#


