PS C:\Users\gmdqn\toss\frontend> npm run dev

> toss-frontend@0.0.0 dev
> vite


  VITE v5.4.21  ready in 777 ms

  ➜  Local:   https://localhost:5173/
  ➜  Network: https://172.30.1.99:5173/
  ➜  press h + enter to show help
[vite-plugin-static-copy] Collected 21 items.
node:internal/process/promises:394
    triggerUncaughtException(err, true /* fromPromise */);
    ^

[Failed to load PostCSS config: Failed to load PostCSS config (searchPath: C:/Users/gmdqn/toss/frontend): [ReferenceError] module is not defined in ES module scope
This file is being treated as an ES module because it has a '.js' file extension and 'C:\Users\gmdqn\toss\frontend\package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
ReferenceError: module is not defined in ES module scope
This file is being treated as an ES module because it has a '.js' file extension and 'C:\Users\gmdqn\toss\frontend\package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
    at file:///C:/Users/gmdqn/toss/frontend/postcss.config.js:1:1
    at ModuleJob.run (node:internal/modules/esm/module_job:274:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:644:26)
    at async importDefault (file:///C:/Users/gmdqn/toss/frontend/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:33759:18)
    at async Object.search (file:///C:/Users/gmdqn/toss/frontend/node_modules/vite/dist/node/chunks/dep-BK3b2jBa.js:25915:23)]

Node.js v22.15.0
PS C:\Users\gmdqn\toss\frontend> 