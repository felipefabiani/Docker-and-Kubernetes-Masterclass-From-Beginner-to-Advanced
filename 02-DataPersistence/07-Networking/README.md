# Advanced Docker - Data Persistence and Orchestration

## Advanced Docker Topics - Resource Limits, Restart Policies, and Networking

### Introduction to Networking in Docker

`docker network ls`

`docker network create app-net`

`docker network inspect app-net`

`docker run -d --name webserver nginx:1.27.0`

`docker network connect --help`

`docker network connect app-net webserver`

`docker network inspect app-net`

```
...
        "Containers": {
            "cca63bbe2ad4f0b1d104e3f97e7876bbade3b47702dc16120a7e3dea40090e3c": {
                "Name": "webserver",
                "EndpointID": "091e7932c3caae3d0bb399a834a718064f737dc66ddc6321e3e4853e843ac36f",
                "MacAddress": "3a:e3:03:84:68:e6",
                "IPv4Address": "172.22.0.2/16",
                "IPv6Address": ""
            }
        },
...
```

`docker inspect webserver`

```
...
"Networks": {
                "app-net": {
                    "IPAMConfig": {},
                    "Links": null,
                    "Aliases": [],
                    "MacAddress": "3a:e3:03:84:68:e6",
                    "DriverOpts": {},
                    "GwPriority": 0,
                    "NetworkID": "66ce1d10d9193a038a3ba11ea232cb3309a686cc9c4c8b91f2b7acc1c6263248",
                    "EndpointID": "091e7932c3caae3d0bb399a834a718064f737dc66ddc6321e3e4853e843ac36f",
                    "Gateway": "172.22.0.1",
                    "IPAddress": "172.22.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DNSNames": [
                        "webserver",
                        "cca63bbe2ad4"
                    ]
                },
                "bridge": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": null,
                    "MacAddress": "de:9b:2f:0d:a3:61",
                    "DriverOpts": null,
                    "GwPriority": 0,
                    "NetworkID": "45368df7083cb06cd0ba80258f3f4ab977efb4d350be789de2113940ecdca088",
                    "EndpointID": "59a2675a7ace929bd4a55bfa3cda321252bfda3d5ca47daff3a97e0243375dfc",
                    "Gateway": "172.17.0.1",
                    "IPAddress": "172.17.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DNSNames": null
                }
            }
...
```

`docker run -it --network app-net alpine:3.20 sh`

=> `apk add curl`

=> `curl webserver`

Remove container and then network 
`docker network rm app-net`

