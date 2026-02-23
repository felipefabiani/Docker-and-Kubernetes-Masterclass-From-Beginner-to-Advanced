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

---

Open 3 terminals

first: `kubectl get pod --watch`
<pre>
$ kubectl get pod --watch
NAME                     READY   STATUS    RESTARTS   AGE
nginx-replicaset-848rl   1/1     Running   0          6m50s
nginx-replicaset-g8rzd   1/1     Running   0          10m
nginx-replicaset-ljbxf   1/1     Running   0          10m
</pre>

second: `kubectl get rs --watch`
<pre>
$ kubectl get rs --watch
NAME               DESIRED   CURRENT   READY   AGE
nginx-replicaset   3         3         3       11m
</pre>

third: `kubectl apply -f nginx-rs.yaml`

<pre>
$ kubectl apply -f nginx-rs.yaml 
replicaset.apps/nginx-replicaset configured
</pre>

<pre>
$ kubectl get rs --watch
NAME               DESIRED   CURRENT   READY   AGE
nginx-replicaset   3         3         3       11m
nginx-replicaset   3         3         3       13m
nginx-replicaset   3         3         3       13m
</pre>

<pre>
$ kubectl get pod --watch
NAME                     READY   STATUS    RESTARTS   AGE
nginx-replicaset-848rl   1/1     Running   0          6m50s
nginx-replicaset-g8rzd   1/1     Running   0          10m
nginx-replicaset-ljbxf   1/1     Running   0          10m
</pre>

Change only reflected to rs because there are 3 containers running.

`kubectl delete pod nginx-replicaset-848rl`


<pre>
$ kubectl get rs --watch
NAME               DESIRED   CURRENT   READY   AGE
nginx-replicaset   3         3         3       11m
nginx-replicaset   3         3         3       13m
nginx-replicaset   3         3         3       13m
nginx-replicaset   3         2         2       17m
nginx-replicaset   3         3         2       17m
nginx-replicaset   3         3         3       17m
</pre>

<pre>
$ kubectl get pod --watch
NAME                     READY   STATUS    RESTARTS   AGE
nginx-replicaset-848rl   1/1     Running   0          6m50s
nginx-replicaset-g8rzd   1/1     Running   0          10m
nginx-replicaset-ljbxf   1/1     Running   0          10m
nginx-replicaset-848rl   1/1     Terminating   0          14m
nginx-replicaset-5j6ls   0/1     Pending       0          0s
nginx-replicaset-848rl   1/1     Terminating   0          14m
nginx-replicaset-5j6ls   0/1     Pending       0          0s
nginx-replicaset-5j6ls   0/1     ContainerCreating   0          0s
nginx-replicaset-848rl   0/1     Completed           0          14m
nginx-replicaset-5j6ls   1/1     Running             0          1s
nginx-replicaset-848rl   0/1     Completed           0          14m
nginx-replicaset-848rl   0/1     Completed           0          14m
</pre>

Third: `kubectl describe pod nginx-replicaset-5j6ls | grep Image`

<pre>
$ kubectl describe pod nginx-replicaset-5j6ls | grep Image
    Image:          nginx:1.27.0-alpine                      <===== new image
    Image ID:       docker-pullable://nginx@sha256:208b70eefac13ee9be00e486f79c695b15cef861c680527171a27d253d834be9
</pre>

-----

`kubectl apply -f nginx-pod.yaml`

<pre>
$ kubectl apply -f nginx-pod.yaml 
pod/solo-nginx created
</pre>

pod will be created and terminate by replicate set as now has 4 containesr with the same label

<pre>
$ kubectl get rs --watch
NAME               DESIRED   CURRENT   READY   AGE
nginx-replicaset   3         3         3       11m
nginx-replicaset   3         3         3       13m
nginx-replicaset   3         3         3       13m
nginx-replicaset   3         2         2       17m
nginx-replicaset   3         3         2       17m
nginx-replicaset   3         3         3       17m
nginx-replicaset   3         4         3       27m
nginx-replicaset   3         3         3       27m
</pre>

<pre>
$ kubectl get pod --watch
NAME                     READY   STATUS    RESTARTS   AGE
nginx-replicaset-848rl   1/1     Running   0          6m50s
nginx-replicaset-g8rzd   1/1     Running   0          10m
nginx-replicaset-ljbxf   1/1     Running   0          10m
nginx-replicaset-848rl   1/1     Terminating   0          14m
nginx-replicaset-5j6ls   0/1     Pending       0          0s
nginx-replicaset-848rl   1/1     Terminating   0          14m
nginx-replicaset-5j6ls   0/1     Pending       0          0s
nginx-replicaset-5j6ls   0/1     ContainerCreating   0          0s
nginx-replicaset-848rl   0/1     Completed           0          14m
nginx-replicaset-5j6ls   1/1     Running             0          1s
nginx-replicaset-848rl   0/1     Completed           0          14m
nginx-replicaset-848rl   0/1     Completed           0          14m
solo-nginx               0/1     Pending             0          0s
solo-nginx               0/1     Pending             0          0s
solo-nginx               0/1     Pending             0          0s
solo-nginx               0/1     ContainerCreating   0          0s
solo-nginx               0/1     Terminating         0          0s
solo-nginx               0/1     Terminating         0          1s
solo-nginx               0/1     ContainerStatusUnknown   0          2s
solo-nginx               0/1     ContainerStatusUnknown   0          2s
solo-nginx               0/1     ContainerStatusUnknown   0          2s
</pre>

<pre>
$ kubectl get pods
NAME                     READY   STATUS    RESTARTS   AGE
nginx-replicaset-5j6ls   1/1     Running   0          10m
nginx-replicaset-g8rzd   1/1     Running   0          28m
nginx-replicaset-ljbxf   1/1     Running   0          28m
</pre>

`kubectl delete -f nginx-rs.yaml`

<pre>
$ kubectl delete -f nginx-rs.yaml
replicaset.apps "nginx-replicaset" deleted from default namespace
</pre>

`$ kubectl get rs`

<pre>
$ kubectl get rs
No resources found in default namespace.
</pre>

`kubectl get pods`

<pre>
$ kubectl get pods
No resources found in default namespace.
</pre>

`kubectl apply -f nginx-pod.yaml`

<pre>
$ kubectl apply -f nginx-pod.yaml
pod/solo-nginx created
</pre>

`kubectl get pod --watch`

<pre>
$ kubectl get pod --watch
NAME         READY   STATUS    RESTARTS   AGE
solo-nginx   1/1     Running   0          51s
</pre>

`kubectl apply -f nginx-rs.yaml`

<pre>
$ kubectl apply -f nginx-rs.yaml
replicaset.apps/nginx-replicaset created
</pre>

<pre>
$ kubectl get pod --watch
NAME         READY   STATUS    RESTARTS   AGE
solo-nginx   1/1     Running   0          51s
solo-nginx   1/1     Running   0          2m12s
nginx-replicaset-g296k   0/1     Pending   0          0s
nginx-replicaset-g296k   0/1     Pending   0          0s
nginx-replicaset-m5tjp   0/1     Pending   0          0s
nginx-replicaset-m5tjp   0/1     Pending   0          0s
nginx-replicaset-g296k   0/1     ContainerCreating   0          0s
nginx-replicaset-m5tjp   0/1     ContainerCreating   0          0s
nginx-replicaset-m5tjp   1/1     Running             0          1s
nginx-replicaset-g296k   1/1     Running             0          1s
</pre>

<pre>
$ kubectl get rs --watch
NAME               DESIRED   CURRENT   READY   AGE
nginx-replicaset   3         3         3       99s
</pre>

<pre>
$ kubectl get pods
NAME                     READY   STATUS    RESTARTS   AGE
nginx-replicaset-g296k   1/1     Running   0          67s
nginx-replicaset-m5tjp   1/1     Running   0          67s
solo-nginx               1/1     Running   0          3m19s
</pre>

cleaning up env

<pre>
$ kubectl delete -f nginx-pod.yaml
pod "solo-nginx" deleted from default namespace

$ kubectl delete -f nginx-rs.yaml
replicaset.apps "nginx-replicaset" deleted from default namespace
</pre>

