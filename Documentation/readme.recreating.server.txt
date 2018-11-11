1.1) Prerequisites

install-package Microsoft.AspNetCore.SpaServices.Extensions

1.2) References

CM.Shared.Web

2) Recreate microservice

2.1) Recreating server application
2.1.1) Run `dotnet new angular -o CM.Presentation.Web`
2.1.2) Move: 
	- directories:
		- ClientApp
		- Controllers
		- Documentation
	- files
		- AppSettings.cs
2.1.3) Modify:
	- Program.cs
	- Startup.cs
	- appSettings.json
		- add Global and Local sections
2.1.6) Add docker support (linux)
2.1.7) Alter:
	- Dockerfile 
		- insert into Dockerfile steps (build and base) NodeJS installation (code snippet *1) and put node modules installation (code snipper *2) just after `dotnet build` (only for build)
	- docker-compose.yml
		- add dependencies for other services (Exchange, Wallet, Identity)
		- add CM.Presentation.Web to CM.Proxy container into dependencies and link list
	- docker-compose.override.yml
		- add network section to container configuration
		- add shared-variables.env file to container configuration

--------------
CODE SNIPPETS
--------------

1) Node installation for docker containers

ENV NODE_VERSION 8.11.1
ENV NODE_DOWNLOAD_SHA 0e20787e2eda4cc31336d8327556ebc7417e8ee0a6ba0de96a09b0ec2b841f60

RUN curl -SL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz" --output nodejs.tar.gz \
    && echo "$NODE_DOWNLOAD_SHA nodejs.tar.gz" | sha256sum -c - \
    && tar -xzf "nodejs.tar.gz" -C /usr/local --strip-components=1 \
    && rm nodejs.tar.gz \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs\
    && npm i -g @angular/cli@latest

2) Node modules installation

`cd ClientApp && npm i && npm rebuild node-sass`