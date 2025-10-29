# Kubernetes Essentials - Deploying and Managing Applications

## [Kubernetes] In-Depth Look at Kubernetes Services

`docker build -t felipefabiani/color-api:1.1.0 .`

`docker push felipefabiani/color-api:1.1.0`

---

`docker build -t felipefabiani/traffic-gen:1.0.0 .`

`docker run -d --rm felipefabiani/traffic-gen:1.0.0 "localhost:3000/api" "0.5"`

`docker push felipefabiani/traffic-gen:1.0.0`

--

`kubectl apply -f color-api-depl.yaml`

`kubectl describe pod color-api-deployment-74fccbb987-7mq44`

<pre>
Annotations:      <none>
Status:           Pending
IP:               10.244.0.58
IPs:
  IP:           10.244.0.58
Controlled By:  ReplicaSet/color-api-deployment-74fccbb987
</pre>

---

`kubectl apply -f color-api-nodeport.yaml`

`kubectl get nodes -o wide`

<pre>
$ kubectl get nodes -o wide
NAME       STATUS   ROLES           AGE     VERSION   INTERNAL-IP    EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION                     CONTAINER-RUNTIME
minikube   Ready    control-plane   5d19h   v1.34.0   192.168.49.2   <none>        Ubuntu 22.04.5 LTS   6.6.87.1-microsoft-standard-WSL2   docker://28.4.0
</pre>

`minikube service color-api-nodeport --url`

<pre>
$ minikube service color-api-nodeport --url
http://127.0.0.1:60486
❗  Because you are using a Docker driver on windows, the terminal needs to be open to run it.
</pre>

**Localhost http://127.0.0.1:60486 is point to 10.109.254.86:30007
**Can open the browser to http://127.0.0.1:60486, http://127.0.0.1:60486/api or http://127.0.0.1:60486/api?format=json


