1.1) Prerequisites

npm install -g @angular/cli@6.0.8

1.2) References

npm i --save oidc-client @ngrx/store @ngrx/effects @ngrx/router-store @ngrx/store-devtools ngrx-store-freeze @nguniversal/module-map-ngfactory-loader

2) Recreate application

2.1.1) ng new ClientApp --style scss --routing --prefix=app && cd ClientApp
2.1.2) ng add @angular/pwa --project ClientApp
2.1.3) ng g universal --client-project ClientApp
2.1.4) ng g app-shell --universal-project --client-project ClientApp

// Alter configuration
2.2.1) alter package.json and add npm script "shell": "ng run ClientApp:app-shell && cd dist/ClientApp/ && http-server -p 8080  && cd ../.."
2.2.2) alter configuration for fc-shell in angular.json and set browserTarget to 'ClientApp:build:production'
2.2.3) alter angular configuration (architect -> build -> options) and add "poll": 1000 (test with number of 100 to 10000) to make angular app live relead faster in docker

// Copy previous app
2.3.0) create dummy dist folder in 'ClientApp'
2.3.1) copy assets into 'ClientApp/src/assets'
2.3.2) move 'app-core', 'app-main' and 'modules' to 'ClientApp/src/app'
2.3.3) update 'app.module.ts' and include AppCoreModule, BrowserAnimationModule and segregate imports
2.3.4) update 'app.component.ts' and wrap 'router-outlet' with 'app-core'
2.3.5) update 'app.routing' and insert routes
2.3.6) update 'app.server' and add 'ModuleMapLoaderModule' to imports
2.3.6) update index.html and add style for html and body 'height: 100%; margin: 0;'