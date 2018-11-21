FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 56559
EXPOSE 44311

ENV NODE_VERSION 8.11.1
ENV NODE_DOWNLOAD_SHA 0e20787e2eda4cc31336d8327556ebc7417e8ee0a6ba0de96a09b0ec2b841f60
RUN curl -SL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz" --output nodejs.tar.gz \
    && echo "$NODE_DOWNLOAD_SHA nodejs.tar.gz" | sha256sum -c - \
    && tar -xzf "nodejs.tar.gz" -C /usr/local --strip-components=1 \
    && rm nodejs.tar.gz \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs\
    && npm i -g @angular/cli@latest

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src

ENV NODE_VERSION 8.11.1
ENV NODE_DOWNLOAD_SHA 0e20787e2eda4cc31336d8327556ebc7417e8ee0a6ba0de96a09b0ec2b841f60
RUN curl -SL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz" --output nodejs.tar.gz \
    && echo "$NODE_DOWNLOAD_SHA nodejs.tar.gz" | sha256sum -c - \
    && tar -xzf "nodejs.tar.gz" -C /usr/local --strip-components=1 \
    && rm nodejs.tar.gz \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs\
    && npm i -g @angular/cli@latest

COPY CM.Presentation.Web.csproj ./
COPY NuGet.Config ./

RUN dotnet restore CM.Presentation.Web.csproj --configfile NuGet.Config

COPY . .

RUN dotnet build CM.Presentation.Web.csproj -c Release -o /app
RUN cd ClientApp && npm i && npm rebuild node-sass

FROM build AS publish
RUN dotnet publish CM.Presentation.Web.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "CM.Presentation.Web.dll"]
