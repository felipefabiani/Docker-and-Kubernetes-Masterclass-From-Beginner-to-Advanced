# Advanced Kubernetes - Security, and Large-Scale Deployments

## Lab: Creating Persistent Volumes with StatefulSets
<pre>
$ minikube ssh
docker@minikube:~$ sudo mkdir -p /mnt/disks/ss-0
docker@minikube:~$ sudo mkdir -p /mnt/disks/ss-1
docker@minikube:~$ sudo mkdir -p /mnt/disks/ss-2
ocker@minikube:~$ sudo chmod 777 /mnt/disks/ss-*
docker@minikube:~$ ls -la /mnt/disks/
total 24
drwxr-xr-x 6 root root 4096 Nov  1 11:51 .
drwxr-xr-x 1 root root 4096 Oct 29 21:39 ..
drwxrwxrwx 2 root root 4096 Oct 29 21:43 local1
drwxrwxrwx 2 root root 4096 Nov  1 11:51 ss-0
drwxrwxrwx 2 root root 4096 Nov  1 11:51 ss-1
drwxrwxrwx 2 root root 4096 Nov  1 11:51 ss-2
</pre>