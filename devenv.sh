docker run --rm -it --name devenv -p 1234:1234 -v $APP_DIR:/app -w "/app/src" mhart/alpine-node /bin/sh
