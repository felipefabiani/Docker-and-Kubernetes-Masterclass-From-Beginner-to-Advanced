# Kubernetes Essentials - Deploying and Managing Applications
## [Kubernetes] Running Containers with Kubernetes

`kubectl create -f .\nginx-pod.yaml`

`kubectl get pods`

`kubectl describe pod nginx`

`kubectl create -f .\nginx-svc.yaml`

`kubectl get services`

<pre>
NAME         TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1        <none>        443/TCP   3d3h
nginx-svc    ClusterIP   10.100.153.153   <none>        80/TCP    56s
</pre>