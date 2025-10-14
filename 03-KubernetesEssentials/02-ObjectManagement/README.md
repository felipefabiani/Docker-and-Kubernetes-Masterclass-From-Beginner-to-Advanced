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

---

`kubectl run color-api --image=felipefabiani/color-api:1.0.0 --dry-run=client -o yaml`

<pre>
apiVersion: v1
kind: Pod
metadata:
  labels:
    run: color-api
  name: color-api
spec:
  containers:
  - image: felipefabiani/color-api:1.0.0
    name: color-api
    resources: {}
  dnsPolicy: ClusterFirst
  restartPolicy: Always
status: {}
</pre>

`kubectl expose pod nginx-pod --type=NodePort --dry-run=client -o yaml`

<pre>
apiVersion: v1
kind: Service
metadata:
  labels:
    app: nginx
  name: nginx
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: nginx
  type: NodePort
status:
  loadBalancer: {}
</pre>

---

`kubectl replace -f .\nginx-pod.yaml`  <= will fail

Cleaning up env

`kubectl delete -f nginx-pod.yaml -f nginx-scv.yaml`

---

`kubectl apply -f .\02-ObjectManagement\`

<pre>
PS C:\Learning\Coursera\Docker-and-Kubernetes\03-KubernetesEssentials> kubectl apply -f .\02-ObjectManagement\
pod/nginx-pod created
service/nginx-svc created
</pre>

`kubectl diff -f 02-ObjectManagement`

`kubectl apply -f 02-ObjectManagement`
<pre>
kubectl apply -f 02-ObjectManagement
pod/nginx-pod configured
service/nginx-svc unchanged
</pre>

`kubectl describe pod nginx-pod`