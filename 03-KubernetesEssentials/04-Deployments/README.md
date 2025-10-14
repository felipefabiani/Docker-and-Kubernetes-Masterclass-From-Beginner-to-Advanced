# Kubernetes Essentials - Deploying and Managing Applications
## [Kubernetes] Running Containers with Kubernetes

`kubectl apply -f nginx-depl.yaml`

`kubectl get deploy` or `kubectl get deployments`

`kubectl describe deploy nginx-deployment`

<pre>
$ kubectl get rs
NAME                         DESIRED   CURRENT   READY   AGE
nginx-deployment-65d974654   5         5         5       4m39s

$ kubectl get pods
NAME                               READY   STATUS    RESTARTS   AGE
nginx-deployment-65d974654-cs2h9   1/1     Running   0          5m8s
nginx-deployment-65d974654-f9v6f   1/1     Running   0          5m8s
nginx-deployment-65d974654-gv2sv   1/1     Running   0          5m8s
nginx-deployment-65d974654-rtkk7   1/1     Running   0          5m8s
nginx-deployment-65d974654-vrjjx   1/1     Running   0          5m8s
</pre>

<pre>
</pre>
<pre>
</pre>
<pre>
</pre>
<pre>
</pre>
<pre>
</pre>

