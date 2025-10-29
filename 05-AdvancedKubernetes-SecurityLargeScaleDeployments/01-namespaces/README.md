# Advanced Kubernetes - Security, and Large-Scale Deployments

## Lab: Creating and Managing Namespaces

`kubectl get namespace`

`kubectl apply -f .`

`kubectl get pod --namespace kube-system`

`kubectl describe pod color-api`

<pre>
$ kubectl get pod
No resources found in default namespace.

$ kubectl get pod -n dev
NAME        READY   STATUS    RESTARTS   AGE
color-api   1/1     Running   0          50s
</pre>

setting the context

<pre>
$ kubectl config current-context
minikube

$ kubectl config set-context --current --namespace=dev
Context "minikube" modified.

$ kubectl get pod
NAME        READY   STATUS    RESTARTS   AGE
color-api   1/1     Running   0          4m11s
</pre>

deleting the namespace will delete the pods.