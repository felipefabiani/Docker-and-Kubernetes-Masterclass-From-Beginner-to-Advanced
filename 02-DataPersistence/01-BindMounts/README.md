# Advanced Docker - Data Persistence and Orchestration
## Working with Bind Mounts

`docker build -t react-app:dev -f Dockerfile.dev .`

`docker run --rm -d -p 3000:3000 -v ./public:/app/public -v ./src:/app/src react-app:dev`

---

`docker volume create website-data`

`docker run -d -p 4000:80 --name website-main -v website-data:/usr/share/nginx/html nginx:1.27.0`

`docker run -d -p 4001:80 --name website-main2 -v website-data:/usr/share/nginx/html nginx:1.27.0`

`docker exec -it website-main sh`

=> `echo "Hello world!" > /usr/share/nginx/html/index.html`

---

`docker volume ls`

`docker volume inspect website-data`