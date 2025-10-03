MONGODB_IMAGE=mongodb/mongodb-community-server
MONGODB_TAG=7.0-ubuntu2204
CONTAINER_NAME=mongodb

#Root credentials
ROOT_USER="root-user"
ROOT_PASSWORD="root-password"
#Database name

docker run -d --rm --name $CONTAINER_NAME \
    -e MONGO_INITDB_ROOT_USERNAME=$ROOT_USER \
    -e MONGO_INITDB_ROOT_PASSWORD=$ROOT_PASSWORD \
    -p 27017:27017 \
 $MONGODB_IMAGE:$MONGODB_TAG