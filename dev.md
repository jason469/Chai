## Connecting to cloud mongoDB

Run the following command in the terminal to connect to mongoDB <br>
`mongosh "mongodb+srv://chaicluster.9efd50d.mongodb.net/ChaiDB" --apiVersion 1 --username Jasonliu215`

## Docker commands

<details><summary>General Commands</summary>
<p>

**List the services** <br>
`docker-compose ps`

**List the containers** <br>
`docker ps`

**Stop services** <br>
`docker-compose stop`
</p>
</details>

<details><summary>Cleaning up</summary>
<p>

**Delete all volumes** <br>
`docker volume rm $(docker volume ls -q)`

**Delete all images** <br>
`docker rmi $(docker images -q)`

**Stop all containers** <br>
`docker stop $(docker ps -a -q)`

**Delete all stopped containers** <br>
`docker rm $(docker ps -a -q)`

**Prune** <br>
`docker system --prune` <br>

</p>
</details>

<details><summary>Using in development</summary>
<p>

**Build images from scratch (no cache)** <br>
`docker-compose -f docker-compose-dev.yaml build --no-cache`

**Start the services** <br>
`docker-compose -f docker-compose-dev.yaml up`

**Build and start containers** <br>
`docker-compose -f docker-compose-dev.yaml up --build`

**_Connecting to mongosh DB container_** <br>
1. Run the following command to create a BASH session in the container <br>
`docker exec -it mongo-db bash`<br>
2. Run `mongosh` so that you can execute mongosh commands

- `show dbs` will show all databases
- `db.Users.insertOne({"name": "Jason Liu", "username": "Jasonliu215", "password":"trash can"})` creates default user
- `db.<collection>.find()` will show all documents within the collection
</p>
</details>


