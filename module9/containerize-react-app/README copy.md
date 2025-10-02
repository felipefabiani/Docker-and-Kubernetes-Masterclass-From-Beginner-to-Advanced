# Docker-and-Kubernetes-Masterclass-From-Beginner-to-Advanced
## Containerize React App

`npx create-react-app --template typescript containerize-react-app`

`cd containerize-react-app`

`npm start`

---------
`npm run build` => Creating an optimized production build

`npx http-server@14.1.1 build` => run app in prod version, it doesn't have the hot reload.

----
`docker build -t react-app:alpine .`

`docker run --rm -it react-app:alpine sh`

-> `ls -la` => check if folders created correctelly.

-> `tree build` => check build structere.

```
/app # tree build
build
├── asset-manifest.json
├── favicon.ico
├── index.html
├── logo192.png
├── logo512.png
├── manifest.json
├── robots.txt
└── static
    ├── css
    │   ├── main.f855e6bc.css
    │   └── main.f855e6bc.css.map
    ├── js
    │   ├── 453.a5ffdd74.chunk.js
    │   ├── 453.a5ffdd74.chunk.js.map
    │   ├── main.aa74a530.js
    │   ├── main.aa74a530.js.LICENSE.txt
    │   └── main.aa74a530.js.map
    └── media
        └── logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg

4 directories, 15 files
```

