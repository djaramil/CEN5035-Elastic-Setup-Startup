# CEN5035-Elastic-Setup-Startup

Sample repository on how to setup and use elasticsearch

Instructions on how to install elastic docker container [elastic-docker-install](elastic-docker-install.md)

Instructions on how to request and use elastic cloud [elastic-cloud-install](elastic-cloud-install.md)

Instructions on how to connect and write nodejs code to elastic:
https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html

Code requires a .env file that contains configurations, server url, pw and tokens.  
See .env-sample for variables needed to be configured.  For more info:

Once elastic is installed and configured, you can run the sample program
For the cloud version:
> elastic-test-cloud.js

For the docker version:
> elastic-test-local.js

Don't forget to install the elastic search node library and verify that you got version 8.8.1
and tested this code using node version v20.2.0
> npm install @elastic/elasticsearch

Notes on how to import shakespeare data to elastic [shakespeare-notes.txt](shakespeare-notes.txt)
