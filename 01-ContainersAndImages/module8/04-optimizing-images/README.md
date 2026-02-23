# Docker-and-Kubernetes-Masterclass-From-Beginner-to-Advanced
# Optimizing images

`npm i --save-dev --save-exact typescript@5.5.3 @types/express@4.17.21`

`npm run build`

`node dist/index.js &`

`curl http://localhost:3000` => hello from express

`docker images`
| REPOSITORY   | TAG    | IMAGE ID     | CREATED             | SIZE  |
|--------------|--------|--------------|---------------------|-------|
| optimized-ts | latest | 21d5b6704d1b | About a minute ago  | 149MB |

`docker run --rm -d optimized-ts`

`docker run --rm -d -p 3000:3000 optimized-ts`

`curl http://localhost:3000` => hello from express