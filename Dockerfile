# This stage installs our modules
FROM mhart/alpine-node:12
WORKDIR /app

# Copy client build folder for a faster docker build
COPY echo-client/build ./echo-client/build

# Copy server package json and build in image
COPY server/package.json server/package-lock.json ./server/
COPY ./server/src ./server/src

# Copy start script
COPY start.sh .

RUN npm install -g localtunnel
RUN npm --prefix ./server ci --prod

CMD ["sh", "start.sh"]