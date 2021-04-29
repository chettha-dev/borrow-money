FROM node:12.16-slim

RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y procps vim
