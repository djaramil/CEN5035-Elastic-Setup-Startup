# Elastic Docker Container Install Instructions

## Install Elastic
https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html

Follow the steps below documented in the link above:

> docker pull docker.elastic.co/elasticsearch/elasticsearch:8.8.1

> docker network create elastic

> docker run --name es01 --net elastic -p 9200:9200 -it docker.elastic.co/elasticsearch/elasticsearch:8.8.1

Open docker desktop, click on Containers, click on `es01` container and check to see if elastic started successfully.  If things worked properly, you will need find a block of output like this:

![Elastic configurations and credentials](/elastic-enrollment.png)


Copy the http_ca.crt security certificate from your Docker container to your local machine.  You will need this to be able to call into elastic from your code

>docker cp es01:/usr/share/elasticsearch/config/certs/http_ca.crt .

If you are on windows, check to make sure your elastic environment started properly.  If it fails, you may need to do some additional configuration on your virtual machine.  For one, you will need to increase the memory to WSL an and elastic container.  Here are some of the commands that maybe required.  Open a command prompt as administrator

>wsl --set-default-version 2
>wsl -d docker-desktop
sysctl -w vm.max_map_count=262144

Edit wsl memory configuration and increase it to 4Gb.  Open Ubuntu terminal and edit /etc/wsl.conf and add this
>[wsl2]
memory=4GB


## Install Kibana

You will need to copy and save the `elastic` password and also the enrollment token.
> docker run -d --name kibana --net elastic -p 5601:5601 kibana:8.8.0

Login to Kibana on your browser from the following link:  
> http://localhost:5601/

On the first time launch, you will need to login and then Kibana will prompt you for the enrollment token.  This token is only good for 30 minutes.  If you take longer than that, you will need to create a new token.  See here for more details on that.
> https://www.elastic.co/guide/en/elasticsearch/reference/current/create-enrollment-token.html

## Test connection to your Elastic Server
> curl --cacert http_ca.crt -u "elastic:<elastic-password>" https://localhost:9200

## Elastic Nodejs Coding
> https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html
