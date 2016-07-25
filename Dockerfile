FROM mhart/alpine-node

RUN mkdir /app
WORKDIR /app

# Install app dependencies
ADD package.json /app/package.json
RUN npm install

ADD test/ /app/test
ADD src/ /app/src

# Run the tests
RUN npm test

# TODO: some cleanup

# run the server
CMD ["npm", "start"]
