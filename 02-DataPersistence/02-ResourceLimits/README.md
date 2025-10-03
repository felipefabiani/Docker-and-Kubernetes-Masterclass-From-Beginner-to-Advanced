# Advanced Docker - Data Persistence and Orchestration
## Advanced Docker Topics - Resource Limits, Restart Policies, and Networking

`docker run --help | grep cpu`

`docker run -d --rm --name cpu_decimals --cpus=0.5 busybox sh -c "while true; do echo 1; done"`

`docker stats`

| CONTAINER ID | NAME         | CPU %  | MEM USAGE / LIMIT    | MEM % | NET I/O         | BLOCK I/O | PIDS |
|--------------|--------------|--------|------------------------|--------|------------------|-----------|------|
| f2093d6ddfe7 | cpu_decimals | 49.55% | 464KiB / 31.21GiB     | 0.00% | 1.17kB / 126B    | 0B / 0B   | 1    |

`docker run -d --rm --name cpu_shares_low --cpu-shares=512 --cpuset-cpus=0 busybox sh -c "while true; do echo 1; done"`

`docker run -d --rm --name cpu_shares_high --cpu-shares=2048 --cpuset-cpus=0 busybox sh -c "while true; do echo 1; done"`

| CONTAINER ID | NAME              | CPU %   | MEM USAGE / LIMIT   | MEM % | NET I/O        | BLOCK I/O | PIDS |
|--------------|-------------------|---------|----------------------|--------|----------------|-----------|------|
| 18f5d152b6e7 | cpu_shares_high   | 80.58%  | 572KiB / 31.21GiB    | 0.00% | 872B / 126B    | 0B / 0B   | 1    |
| 554f27f345f1 | cpu_shares_low    | 20.59%  | 460KiB / 31.21GiB    | 0.00% | 1.3kB / 126B   | 0B / 0B   | 1    |

`docker run -d --rm --name cpu_quota --cpu-period=100000 --cpu-quota=75000 busybox sh -c "while true; do echo 1; done"`

`docker stats`

| CONTAINER ID | NAME       | CPU %   | MEM USAGE / LIMIT   | MEM % | NET I/O         | BLOCK I/O     | PIDS |
|--------------|------------|---------|----------------------|--------|------------------|----------------|------|
| ba6302eacd79 | cpu_quota  | 74.85%  | 500KiB / 31.21GiB    | 0.00% | 1.17kB / 126B    | 3.33MB / 0B    | 1    |






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
