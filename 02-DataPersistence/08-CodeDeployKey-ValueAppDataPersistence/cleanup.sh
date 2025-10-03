# 1. Stop and remove the MongoDB container if it's running
# 2. Remove the Docker volume
# 3. Remove the Docker network

source .env.db
source .env.volume  
source .env.network

if [ "$(docker ps -aq -f name=$DB_CONTAINER_NAME)" ]; then
    echo "Stopping and removing container $DB_CONTAINER_NAME"
    docker kill $DB_CONTAINER_NAME # && docker rm $DB_CONTAINER_NAME
else
    echo "Container $DB_CONTAINER_NAME is not running"
fi

if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
    echo "Removing volume $VOLUME_NAME"
    docker volume rm $VOLUME_NAME
else
    echo "Volume $VOLUME_NAME does not exist"
fi

if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    echo "Removing network $NETWORK_NAME"
    docker network rm $NETWORK_NAME
else
    echo "Network $NETWORK_NAME does not exist"
fi
echo "Cleanup completed."