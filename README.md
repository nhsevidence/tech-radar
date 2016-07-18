# NICE Technology radar app

This is going to be a shiny, useful tool showing the technologies in use at NICE.

## Requirements
* [Docker Toolbox](https://www.docker.com/products/docker-toolbox)

## Building and running

Open a docker quickstart terminal (or a terminal on linux) and change directory to the root of this repository.

To build the app type:

```
sh build.sh
```

To run the app:
```
sh run.sh
```

Now open your browser and visit (if using docker on windows/mac osx)

```
192.168.99.100:1234
```

192.168.99.100 is the docker machine ip (this may be different for you - the docker quickstart terminal will tell you what the ip is when you open it)

Or, if running docker natively on linux

```
localhost:1234
```



