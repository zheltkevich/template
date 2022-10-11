##### Required:
**`node`** >=16.0.0 <17.0.0  
**`npm`** >=8.0.0 <9.0.0  

##### Different *branches* contain different templates:
*master* — `webpack@5`, `eslint@8`, `stylelint@14`, `lint-staged@13`  
*vue3* — *master* + `vue@3`, `vuex@4`, `vue-router@4`  

#### Scripts:
`npm run setup` — installing dependencies then patching pre-commit hook  
`npm run build` — production build packing into the **.dist** folder  
`npm run dev` — starting the webpack dev server in development with hot module reload, source-map and pre-commit guard  
