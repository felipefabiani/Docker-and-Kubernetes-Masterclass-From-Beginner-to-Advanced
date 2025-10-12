# Kubernetes Essentials - Deploying and Managing Applications
## [Kubernetes] Running Containers with Kubernetes

`kubectl version`
`minikube start`

`kubectl config current-context`

to set different content:
`kubectl config set-context minikube`

`kubectl run --help`

`kubectl run nginx --image=nginx:1.27.0`

---

`kubectl get pods`

`kubectl describe pod nginx`

`kubectl run -it alpine --image=alpine:3.20 sh`

=> `apk --update add curl`

=> `curl 10.244.0.4`

=> `exit`

`kubectl logs nginx`

`kubectl get pods`

`kubectl delete pod alpine`

---

`kubectl expose pod nginx --type=NodePort --port=80`

`kubectl get service`

`kubectl run -it alpine --image=alpane:3.20 sh`

=> `apk --update add curl`

=> `curl 10.107.130.74`

=> `exit`

`kubectl delete service nginx`

`mkdir color-api`

`cd color-api`

`npm init -y`

`npm i --save-exact express@4.19.2`

`docker build -t color-api .`

`docker run -d -p 3000:80 --name color-api color-api`

`docker logs color-api`

`curl http://localhost:3000`

`docker rm -f color-api`