FROM mhart/alpine-node

RUN mkdir /src
WORKDIR /src

# Install app dependencies
ADD src/package.json /src/package.json
RUN npm install && \
    npm install -g mocha

# Run the tests
RUN mocha

# Add code into image
ADD src/ /src

# run the server
CMD ["npm", "start"]