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





