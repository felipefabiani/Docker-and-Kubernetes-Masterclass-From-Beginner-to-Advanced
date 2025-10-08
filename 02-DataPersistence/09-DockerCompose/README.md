# Advanced Docker - Data Persistence and Orchestration

## Docker compose

`docker compose version`

`docker run --rm --name mongosh -it --network 09-dockercompose_default mongodb/mongodb-community-server:7.0-ubuntu2204 mongosh mongodb://09-dockercompose-db-1`
=> `show dbs;`

---

`docker-compose ps`

`docker-compose ps -a`

`docker-compose down`

`docker-compose up`

---

`docker-compose up --build`
