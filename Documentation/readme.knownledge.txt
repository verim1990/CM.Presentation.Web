1) [VS] Build and run application locally

(Click) Project -> Build 

Will build application in Debug mode. Artifacts will be produced to bin/Debug.

(Click) Project -> Debug -> Start new instance 

Will build application in Debug mode and will run application in new instance of IIS Express with usage of ASP.NET Core Web Server in Development mode.

2) [DOTNET] Build and run application locally

2.1) Building application

dotnet build [some.csproj] [-c {Debug|Release}] [-o /path/to/artifacts]

Builds only server application and puts artifacts to appropriate catalog depending on configuration (Debug or Release) or to specified output path if is given.
Worth notifying in case of angular web application is that build process doesn't build client application. It need to be done separately by f.e. `ng build` command or just by publishing application.

2.2) Publishing application

dotnet publish [some.csproj] [-c {Debug|Release}] [-o /path/to/artifacts]

Under the hood runs build process with corrensponding parameters, but in addition it builds also client application by running `ng build` command.
When building cient application locally all node, npm and angular prerequisities need to be preinstalled locally. Dont forget about node-sass bindings.

2.3) Running application

dotnet run [-c {Debug|Release}]

Before running application its very important to select approriate environment. You can do that by:

set ASPNETCORE_ENVIRONMENT={Development|Production|Staging}

or by settings ASPNETCORE_ENVIRONMENT in launchSettings.json

If application is not build yet, then build process will be run with corresponding parameters. After build, application will be run in approriate selected environment taking artifacts from approriate catalog depending of configuration (Debug or Release).
If you run in Development then after start additional angular-cli client server will be run, which will be resposible for building client application (it doesn't need to be precompiled in first place).
If you run in Production then additional angular-cli server wont be run and instead of that server will assume that client application is already precompiled and is waiting to be served from ClientApp/dist/ catalog. 
If you will run in Production without precompiling client application then server application will throw exception for every request for web page.
To compile client application at first place, you can use angular-cli builder (command `ng build`) and just rely on dotnet command `dotnet publish` which underhood build server application and cliehnt application by runngig angular-cli's `ng build`. 

Application can be run also as self contained application by using command:

dotnet bin/path/to/application.dll

3) [DOCKER] Build and run dockerized application (outside docker-compose)

Notice that dockerized application (run in docker) will be run in Production mode. This can be changed running container with appropriate environment variable.
Also do not forget to set .dockeringore file corresponding to selected dockerizing mode (local or standalone), to not pollute docker containers with not necessary data.

3.1) Dockerizing local mode

dotnet publish [some.csproj] [-c {Debug|Release}] -o ./obj/Docker/publish -r linux-x64
docker build -t cm_presentation_web -f Dockerfile .
docker run --rm -it -p 5000:80 cm_presentation_web

Builds application locally with Dotnet tool and runs it in Docker.
Correct path to artifacts is needed because Dockerfile is preconfigured to take application from obj\Docker\publish catalog.
