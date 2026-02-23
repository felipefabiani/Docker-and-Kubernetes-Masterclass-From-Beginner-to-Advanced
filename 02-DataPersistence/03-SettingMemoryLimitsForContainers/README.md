# Advanced Docker - Data Persistence and Orchestration
## Advanced Docker Topics - Resource Limits, Restart Policies, and Networking
### Setting Memory Limits for Containers

`docker run --help | grep memory`

`docker run -d --rm --name mongodb mongodb/mongodb-community-server:7.0-ubuntu2204`

`docker stats`

| CONTAINER ID | NAME | CPU % | MEM USAGE / LIMIT | MEM % | NET I/O | BLOCK I/O | PIDS |
|--------------|------|--------|--------------------|--------|----------|------------|------|
| d02cf0ac2539|mongodb|0.55%|79.27MiB / 31.21GiB|0.25%|1.17kB / 126B|504kB / 565kB|33 |

Container won't run, will be killed with exception out of memory:
`docker run -d --name mongodb --memory="20m" mongodb/mongodb-community-server:7.0-ubuntu2204`

`docker inspect mongodb`
```
...
 "State": {
            "Status": "exited",
            "Running": false,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": true,   <==== Out of Memoty
            "Dead": false,
            "Pid": 0,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2025-10-03T11:40:17.722374965Z",
            "FinishedAt": "2025-10-03T11:40:18.437865647Z"
        },
...
```

`docker run -d --name mongodb --memory-reservation="80m" --memory="100m" mongodb/mongodb-community-server:7.0-ubuntu2204`

| CONTAINER ID | NAME | CPU % | MEM USAGE / LIMIT | MEM % | NET I/O | BLOCK I/O | PIDS |
|--------------|------|--------|--------------------|--------|----------|------------|------|
| 590577bb3980|mongodb|0.54%|78.93MiB / 100MiB|78.93%|1.17kB / 126B|6.25MB / 233kB|33 |


`docker run -d --rm --name mongodb --memory="10m" --memory-swap="200m" mongodb/mongodb-community-server:7.0-ubuntu2204`

| CONTAINER ID | NAME | CPU % | MEM USAGE / LIMIT | MEM % | NET I/O | BLOCK I/O | PIDS |
|--------------|------|--------|--------------------|--------|----------|------------|------|
| f90045fd90f2|mongodb|2.78%|9.93MiB / 10MiB|99.30%|1.17kB / 126B|53MB / 126MB|34 |

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
