FROM node:16-bullseye-slim as base

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
        build-essential \
        python3 && \
    rm -fr /var/lib/apt/lists/* && \
    rm -rf /etc/apt/sources.list.d/*


RUN yarn global add truffle ganache 

FROM base as truffle

RUN mkdir -p /home/app
WORKDIR /home/app

CMD tail -f /dev/null 

FROM base as ganache

RUN mkdir -p /home/ganache


EXPOSE 8545/tcp
