------
NOTES
------

1) Client application

When using `ng build` or `ng serve` shell application is not included and pwa doesnt work.
So we need to build shell application separately by: ng run ClientApp:app-shell 
and later we need to start separate server by: cd dist/ClientApp/ && http-server -p 8080 

ng run ClientApp:app-shell && cd dist/ClientApp/ && http-server -p 8080  && cd ../..

2) Node-sass binding problem

In case of node-sass binding problems, just connect to container by executing:

docker exec -it _container_hash /bin/bash
cd ClientApp && npm i -g npm && npm rebuild node-sass
