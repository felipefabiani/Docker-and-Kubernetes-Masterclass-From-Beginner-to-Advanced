# Responsible for creating voulume and network for MongoDB
source .env.network
source .env.volume


# Check volume
if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
    echo "Volume $VOLUME_NAME already exists"
else
    docker volume create "$VOLUME_NAME"
fi

if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    echo "Network $NETWORK_NAME already exists"
else
    docker network create "$NETWORK_NAME"
fi