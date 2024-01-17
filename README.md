# tf2-automatic-app-starter
- create a `.env` file from the template at `template.env`
- create a `/bots/bot1.env` file from the template at `/bots/template.env` and add your bots account info
- start the minio service
- go to http://localhost:9001
- create a bucket called `tf2-automatic`
- start everything

# Adding more bots
Simply copy paste the `bot1` template at the very bottom of the `docker-compose.yml` file [here](https://github.com/zeusjunior/tf2-automatic-app-starter/blob/master/docker-compose.yml#L115)  
Rename the service name and make the necessary env file changes

# Developing your app
Uncomment these lines
https://github.com/zeusjunior/tf2-automatic-app-starter/blob/master/docker-compose.yml#L109-L111  
Then restart the app container

# Production
Comment out or remove all the `ports` fields in the `docker-compose.yml` file.  
These expose your containers to the internet and you don't want that. But they're useful for developing.  
  
One exception might be to temporarily keep the port to minio enabled while you create a bucket in production, and then disable it again