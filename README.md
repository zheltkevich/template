#### Required:
**`node`** >=16.0.0 <17.0.0  
**`npm`** >=8.0.0 <9.0.0  

#### Repo contains:
`webpack@5`, `eslint@8`, `stylelint@14`, `lint-staged@13`  

#### Scripts:
`npm run init` — installing dependencies then patching pre-commit hook  
`npm run build` — production build packing into the **.dist** folder  
`npm run dist` — starting http-server for production build audit  
`npm run dev` — starting the webpack dev server in development mode with hot module reload, source-map and pre-commit guard  
