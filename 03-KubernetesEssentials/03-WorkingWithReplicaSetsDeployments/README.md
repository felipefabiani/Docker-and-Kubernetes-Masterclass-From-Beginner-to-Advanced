# Kubernetes Essentials - Deploying and Managing Applications
## [Kubernetes] Working with ReplicaSets and Deployments

`kubectl apply -f nginx-rs.yaml`

<pre>
$ kubectl apply -f nginx-rs.yaml
replicaset.apps/nginx-replicaset created
</pre>

`kubectl get rs` 

<pre>
$ kubectl get rs
NAME               DESIRED   CURRENT   READY   AGE
nginx-replicaset   3         3         3       65s
</pre>

`kubectl get pods`

<pre>
$ kubectl get pods
NAME                     READY   STATUS    RESTARTS   AGE
nginx-pod                1/1     Running   0          21m
nginx-replicaset-g8rzd   1/1     Running   0          116s
nginx-replicaset-ljbxf   1/1     Running   0          116s
</pre>

`kubectl delete pod nginx-pod`
<pre>
$ kubectl get pods
NAME                     READY   STATUS    RESTARTS   AGE
nginx-replicaset-848rl   1/1     Running   0          26s
nginx-replicaset-g8rzd   1/1     Running   0          4m15s
nginx-replicaset-ljbxf   1/1     Running   0          4m15s
</pre>

`kubectl describe rs nginx-replicaset`

