# Advanced Docker - Data Persistence and Orchestration

## [Docker] Project - Code and Deploy a Key-Value App with Data Persistence

### Adding Root Credentials to MongoDB

if need add execution mod to the scripts `chmod +X *.sh`

`./start-db.sh`

`./cleanup.sh`

---

`mkdir backend`

`cd backend`

`npm init -y`

`npm i express@4.19.2 mongoose@8.5.1 body-parser@1.20.2 --save-exact`

---

`docker build -t key-value-backend -f Dockerfile.dev .`

`docker run --rm -d --name backend --network key-value-net key-value-backend`

`docker exec -it mongodb mongosh -u root-user -p root-password --authenticationDatabase admin`
use key-value-db
db.getUsers()


db = db.getSiblingDB("key-value-db");
db.createUser({
  user: "key-value-user",
  pwd: "key-value-password",
  roles: [{ role: "readWrite", db: "key-value-db" }]
});

docker run mongodb -v ${PWD}/db-config/:/docker-entrypoint-initdb.d/ cp -R ./ /srv/build