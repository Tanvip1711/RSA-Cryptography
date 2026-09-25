FROM ubuntu:24.04

RUN apt-get update && \
    apt-get install -y \
    g++ \
    make \
    libasio-dev \
    libboost-system-dev \
    libboost-thread-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN g++ main.cpp rsa.cpp \
    -Iinclude \
    -std=c++17 \
    -o rsa_server

CMD ["./rsa_server"]