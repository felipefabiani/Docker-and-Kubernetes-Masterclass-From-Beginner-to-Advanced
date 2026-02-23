# Advanced Kubernetes - Security, and Large-Scale Deployments

## Lab: Setting Up Resource Quotas

<pre>
$ kubectl get resourcequota -A
NAMESPACE   NAME         REQUEST                                     LIMIT                                   AGE
dev         dev-quota    requests.cpu: 0/1, requests.memory: 0/1Gi   limits.cpu: 0/2, limits.memory: 0/2Gi   4m18s
prod        prod-quota   requests.cpu: 0/2, requests.memory: 0/2Gi   limits.cpu: 0/4, limits.memory: 0/4Gi   4m4s

$ kubectl describe resourcequota dev-quota -n dev
Name:            dev-quota
Namespace:       dev
Resource         Used  Hard
--------         ----  ----
limits.cpu       0     2
limits.memory    0     2Gi
requests.cpu     0     1
requests.memory  0     1Gi
</pre>
