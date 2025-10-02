# Advanced Docker - Data Persistence and Orchestration
## Working with Bind Mounts

`docker build -t react-app:dev -f Dockerfile.dev .`

`docker run --rm -d -p 3000:3000 -v ./public:/app/public -v ./src:/app/src react-app:dev`

