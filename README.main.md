
TODO :

*) Deploy on Heroku

--------------------------------------------


`docker-compose up`
=> it starts the whole project. 

!) Changes made to the source code won't apply till you rebuild the images !


---------------------------------------------------------

    Frontend Development:
1) Start Docker on your local machine
2) start api + DB containers by running the following command :
   `docker-compose -f docker-compose.dev.frontend.yml up`
3) run `npm run start` in frontend terminal.


______________________________________________________________________

    Backend Development
1) Start Docker on your local machine
2) start DB container by running the following command : `docker-compose -f docker-compose.dev.backend.yml up -d` 

3) run `npm run start` in backend terminal.
4) run `npm run start` in frontend terminal.



______________________________________________________________________
Deployment URL :

https://gitlab-stats.w11k-dev.de/

______________________________________________________________________

>**Notice**:
>For the backend to properly work, you need to make sure that the GitLab access Token is still valid.
>To create a new token complete the following steps :
>1) sign-in in Gitlab.com to your W11K account.
>2) go to 'Preferences'
>3) click 'on Access Tokens'
>4) set Token name , Expiration date and select scopes => api
>5) once the new token is created you can add it in the source code of the project to the file at the following path :
"backEnd/gitlab-stats-api/src/_modules/_group-related-modules/group/ajax.service.ts"

