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

`kubectl run -it alpine --image=alpane:3.20 sh`

`kubectl run -it alpine --image=alpine:3.20 sh`

=> `apk --update add curl`

=> `curl 10.244.0.4`

=> `exit`

`kubectl logs nginx`

`kubectl get pods`

`kubectl delete pod alpine`