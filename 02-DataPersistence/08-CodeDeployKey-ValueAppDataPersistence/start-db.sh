MONGODB_IMAGE=mongodb/mongodb-community-server
MONGODB_TAG=7.0-ubuntu2204
CONTAINER_NAME=mongodb

#Root credentials
ROOT_USER="root-user"
ROOT_PASSWORD="root-password"

# Key-Value credentials
KEY_VALUE_DB='key-value-db';
KEY_VALUE_USER='key-value-user';
KEY_VALUE_PASSWORD='key-value-password';

# Connectivity
LOCALHOST_PORT=27017
CONTAINER_PORT=27017
NETWORK_NAME="key-value-net"

# Storage
VOLUME_NAME="key-value-data"
VOLUME_CONTAINER_PATH="/data/db"

docker run -d --rm --name $CONTAINER_NAME \
    -e MONGO_INITDB_ROOT_USERNAME=$ROOT_USER \
    -e MONGO_INITDB_ROOT_PASSWORD=$ROOT_PASSWORD \
    -r KEY_VALUE_DB=$KEY_VALUE_DB \
    -e KEY_VALUE_USER=$KEY_VALUE_USER \
    -e KEY_VALUE_PASSWORD=$KEY_VALUE_PASSWORD \
    -v $VOLUME_NAME:$VOLUME_CONTAINER_PATH \
    -v ./db-conifg/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro \
    --network $NETWORK_NAME \
    -p $LOCALHOST_PORT:$CONTAINER_NAME \
 $MONGODB_IMAGE:$MONGODB_TAG