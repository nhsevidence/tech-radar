# NICE Technology radar app

This is going to be a shiny, useful tool showing the technologies in use at NICE.

## Requirements
* [Docker Toolbox](https://www.docker.com/products/docker-toolbox)

## Development environment

There is a supplied development environment with nodejs and npm installed in a docker container. This directory is mounted in so you can edit the files with whatever editor you want on your host machine.

Open a docker quickstart terminal (or a terminal on linux) and change directory to the root of this repository.

Set the APP_DIR directory to the FULL path to this directory
```
export APP_DIR=/full/path/to/tech-radar/code
```
For example if using docker toolbox on windows it will be /c/Users/<username>/src/tech-radar.  On MAC osx it will be /Users/<username>/src/tech-radar.  Docker toolbox only shares your user directory with docker so you have to clone this repository somewhere in your user directory!

Now run the environment up using:
```
sh devenv.sh
```

To escape from the environment once you are in it CTRL-D

## Running the app
Once you've got the dev environment setup (or installed node/npm locally) 

Install packages:
```
npm install
```

To run the app:
```
npm start
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



