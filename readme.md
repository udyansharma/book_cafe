# Book_cafe

What you see here is a result of a one day API building challenge. Nothing much, just tried a better architecture which I found on the internet and tried very basic redis caching.
 
How to run
1) On host machine
    redis-server // starts the redis server
    NODE_ENV=localEnv npm start
2) In a Dockerized Setup
    docker-compose up -d  

To test the API endpoints run the (testRun.sh) script. 