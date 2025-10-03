# Advanced Docker - Data Persistence and Orchestration
## Advanced Docker Topics - Resource Limits, Restart Policies, and Networking
### Setting Memory Limits for Containers

`docker run --help | grep memory`

`docker run -d --name restart_fail --restart on-failure:3 busybox sh -c "sleep 3; exit 1"`

```
...
           "Image": "sha256:0ed463b26daee791b094dc3fff25edb3e79f153d37d274e5c2936923c38dac2b",
        "ResolvConfPath": "/var/lib/docker/containers/8b512ada6a0a9d27b346cc1505f529725cad0971b6984857893530745f1e7e46/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/8b512ada6a0a9d27b346cc1505f529725cad0971b6984857893530745f1e7e46/hostname",
        "HostsPath": "/var/lib/docker/containers/8b512ada6a0a9d27b346cc1505f529725cad0971b6984857893530745f1e7e46/hosts",
        "LogPath": "/var/lib/docker/containers/8b512ada6a0a9d27b346cc1505f529725cad0971b6984857893530745f1e7e46/8b512ada6a0a9d27b346cc1505f529725cad0971b6984857893530745f1e7e46-json.log",
        "Name": "/restart_fail",
        "RestartCount": 3,   <= Restarted 3 times
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": null,
        "HostConfig": {
            "Binds": null,
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "bridge",
            "PortBindings": {},
            "RestartPolicy": {
                "Name": "on-failure",
                "MaximumRetryCount": 3 <= max retry 3 times
            },
...
```

`docker run -d --name restart_always --restart always busybox sh -c "sleep 3; exit 1"`
`docker run -d --name restart_us --restart unless-stoped busybox sh -c "sleep 3; exit 1"`

---
# Get docker stats with headers
docker stats --no-stream --format \
"{{.Container}}|{{.Name}}|{{.CPUPerc}}|{{.MemUsage}}|{{.MemPerc}}|{{.NetIO}}|{{.BlockIO}}|{{.PIDs}}" \
| {
  # Print Markdown header
  echo "| CONTAINER ID | NAME | CPU % | MEM USAGE / LIMIT | MEM % | NET I/O | BLOCK I/O | PIDS |"
  echo "|--------------|------|--------|--------------------|--------|----------|------------|------|"

  # Format each line as a Markdown row
  while IFS= read -r line; do
    echo "| $line |"
  done
}
