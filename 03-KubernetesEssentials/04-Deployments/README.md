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

`kubectl diff -f nginx-depl.yaml`

`kubectl describe deploy nginx-depl`

<pre>
$ kubectl describe deploy nginx-depl
Name:                   nginx-deployment
Namespace:              default
CreationTimestamp:      Tue, 14 Oct 2025 14:45:36 +0100
Labels:                 app=nginx
Annotations:            deployment.kubernetes.io/revision: 2
Selector:               app=nginx
Replicas:               5 desired | 5 updated | 5 total | 5 available | 0 unavailable
StrategyType:           RollingUpdate
MinReadySeconds:        0
RollingUpdateStrategy:  25% max unavailable, 25% max surge
Pod Template:
  Labels:  app=nginx
  Containers:
   nginx:
    Image:      nginx:1.27.0-alpine
    Port:       80/TCP
    Host Port:  0/TCP
    Limits:
      cpu:     500m
      memory:  128Mi
    Requests:
      cpu:         250m
      memory:      64Mi
    Environment:   <none>
    Mounts:        <none>
  Volumes:         <none>
  Node-Selectors:  <none>
  Tolerations:     <none>
Conditions:
  Type           Status  Reason
  ----           ------  ------
  Available      True    MinimumReplicasAvailable
  Progressing    True    NewReplicaSetAvailable
OldReplicaSets:  nginx-deployment-65d974654 (0/0 replicas created)
NewReplicaSet:   nginx-deployment-698b844dc4 (5/5 replicas created)
Events:
  Type    Reason             Age    From                   Message
  ----    ------             ----   ----                   -------
  Normal  ScalingReplicaSet  15m    deployment-controller  Scaled up replica set nginx-deployment-65d974654 from 0 to 5
  Normal  ScalingReplicaSet  3m31s  deployment-controller  Scaled up replica set nginx-deployment-698b844dc4 from 0 to 2
  Normal  ScalingReplicaSet  3m31s  deployment-controller  Scaled down replica set nginx-deployment-65d974654 from 5 to 4
  Normal  ScalingReplicaSet  3m31s  deployment-controller  Scaled up replica set nginx-deployment-698b844dc4 from 2 to 3
  Normal  ScalingReplicaSet  3m29s  deployment-controller  Scaled down replica set nginx-deployment-65d974654 from 4 to 3
  Normal  ScalingReplicaSet  3m29s  deployment-controller  Scaled up replica set nginx-deployment-698b844dc4 from 3 to 4
  Normal  ScalingReplicaSet  3m29s  deployment-controller  Scaled down replica set nginx-deployment-65d974654 from 3 to 2
  Normal  ScalingReplicaSet  3m29s  deployment-controller  Scaled up replica set nginx-deployment-698b844dc4 from 4 to 5
  Normal  ScalingReplicaSet  3m29s  deployment-controller  Scaled down replica set nginx-deployment-65d974654 from 2 to 1
  Normal  ScalingReplicaSet  3m28s  deployment-controller  Scaled down replica set nginx-deployment-65d974654 from 1 to 0
</pre>

<pre>
$ kubectl get pods
NAME                                READY   STATUS    RESTARTS   AGE
nginx-deployment-698b844dc4-4l7zf   1/1     Running   0          7m20s
nginx-deployment-698b844dc4-bwpkm   1/1     Running   0          7m18s
nginx-deployment-698b844dc4-hnvqf   1/1     Running   0          7m18s
nginx-deployment-698b844dc4-kjfmv   1/1     Running   0          7m20s
nginx-deployment-698b844dc4-rmjd6   1/1     Running   0          7m20s

$ kubectl describe pod nginx-deployment-698b844dc4-4l7zf
Name:             nginx-deployment-698b844dc4-4l7zf
Namespace:        default
Priority:         0
Service Account:  default
Node:             minikube/192.168.49.2
Start Time:       Tue, 14 Oct 2025 14:57:22 +0100
Labels:           app=nginx
                  pod-template-hash=698b844dc4
Annotations:      <none>
Status:           Running
IP:               10.244.0.32
IPs:
  IP:           10.244.0.32
Controlled By:  ReplicaSet/nginx-deployment-698b844dc4
Containers:
  nginx:
    Container ID:   docker://e4fc1dbc4d710edcb2843c01e76d22ceb3119d6db9e407c3c54c320f0003245c
    <b><i>Image:          nginx:1.27.0-alpine</i></b>
    Image ID:       docker-pullable://nginx@sha256:208b70eefac13ee9be00e486f79c695b15cef861c680527171a27d253d834be9
    Port:           80/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Tue, 14 Oct 2025 14:57:22 +0100
    Ready:          True
    Restart Count:  0
    Limits:
      cpu:     500m
      memory:  128Mi
    Requests:
      cpu:        250m
      memory:     64Mi
    Environment:  <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-mc6jk (ro)
Conditions:
  Type                        Status
  PodReadyToStartContainers   True
  Initialized                 True
  Ready                       True
  ContainersReady             True
  PodScheduled                True
Volumes:
  kube-api-access-mc6jk:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    Optional:                false
    DownwardAPI:             true
QoS Class:                   Burstable
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age    From               Message
  ----    ------     ----   ----               -------
  Normal  Scheduled  7m47s  default-scheduler  Successfully assigned default/nginx-deployment-698b844dc4-4l7zf to minikube
  Normal  Pulled     7m47s  kubelet            Container image "nginx:1.27.0-alpine" already present on machine
  Normal  Created    7m47s  kubelet            Created container: nginx
  Normal  Started    7m46s  kubelet            Started container nginx
</pre>
<pre>
</pre>
<pre>
</pre>
<pre>
</pre>

