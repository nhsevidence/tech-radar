FROM mhart/alpine-node

RUN mkdir /src
WORKDIR /src

# Install app dependencies
ADD src/package.json /src/package.json
RUN npm install && \
    npm install -g mocha

ADD test/ /test
ADD src/ /src

# Run the tests
RUN mocha

# TODO: some cleanup

# run the server
CMD ["npm", "start"]