MONGODB_IMAGE="mongodb/mongodb-community-server"
MONGODB_TAG="7.0-ubuntu2204"
source .env.db

#Root credentials
ROOT_USER="root-user"
ROOT_PASSWORD="root-password"

# Key-Value credentials
KEY_VALUE_DB="key-value-db";
KEY_VALUE_USER="key-value-user";
KEY_VALUE_PASSWORD="key-value-password";

# Connectivity
source .env.network
LOCALHOST_PORT=27017
CONTAINER_PORT=27017

# Storage
source .env.volume
VOLUME_CONTAINER_PATH="/data/db"

source setup.sh

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
    echo "Container $DB_CONTAINER_NAME is already running"
    echo "The container will be removed when stopped."
    echo "To stop the container, run: docker stop $DB_CONTAINER_NAME"
    exit 1
fi

# map the correct path for Windows
# 1. Get the full path of the mongo-init.js file
full_path="$(pwd -W)/db-config/mongo-init.js"
echo $full_path

docker run -d --rm --name $DB_CONTAINER_NAME \
    -e MONGO_INITDB_ROOT_USERNAME=$ROOT_USER \
    -e MONGO_INITDB_ROOT_PASSWORD=$ROOT_PASSWORD \
    -e KEY_VALUE_DB=$KEY_VALUE_DB \
    -e KEY_VALUE_USER=$KEY_VALUE_USER \
    -e KEY_VALUE_PASSWORD=$KEY_VALUE_PASSWORD \
    -p $LOCALHOST_PORT:$CONTAINER_PORT \
    -v $VOLUME_NAME:$VOLUME_CONTAINER_PATH \
    -v $full_path:/docker-entrypoint-initdb.d/mongo-init.js:ro \
    --network $NETWORK_NAME \
    $MONGODB_IMAGE:$MONGODB_TAG 