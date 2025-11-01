# Advanced Kubernetes - Security, and Large-Scale Deployments

## [Kubernetes] Storage and Data Persistence


`kubectl exec -it empty-dir-demo -c empty-dir-writer -- sh`

<pre>
/ # cat /usr/share/temp/hello.txt
Hello from the emptyDir demo!
/ #
</pre>

`kubectl exec -it empty-dir-demo -c empty-dir-reader -- sh`

<pre>
/ #
/ # cd temp/
/temp # cat hello.txt
Hello from the emptyDir demo!
/temp # echo 'Test' > text.txt
sh: can't create text.txt: Read-only file system
/temp #
</pre>