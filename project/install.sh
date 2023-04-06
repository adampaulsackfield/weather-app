#! /bin/bash

sudo apt-get update -y

sudo apt-get install docker-compose

docker-compose --version

cd project

docker-compose up -d