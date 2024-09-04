# tf2-automatic-app-starter
- `cd app && yarn install`
- create a `.env` file from the template at `template.env`
- create a `/bots/bot1.env` file from the template at `/bots/template.env` and add your bots account info
- start the minio service
- go to http://localhost:9001
- create a bucket called `tf2-automatic`
- start everything

# Developing your app
Just write your code in the `./app` folder!  

# Adding more bots
Simply copy paste the `bot1` template at the very bottom of the `docker-compose.yml` file [here](https://github.com/zeusjunior/tf2-automatic-app-starter/blob/master/docker-compose.yml#L97)  
Rename the service name and make the necessary env file changes  

# Production
Use the `docker-compose-prod.yml` file instead of the default `docker-compose.yml`. Make sure to update the image that it's using to your own  
Pay attention that the 9001 port for minio is still exposed. This will allow you to create the tf2-automatic bucket in production, you can undo this after you've done so  