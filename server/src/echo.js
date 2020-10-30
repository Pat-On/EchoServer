function echo(request) {
  const echoResponse = {
    fullUrl: `${request.protocol}://${request.get("host")}${
      request.originalUrl
    }`,
    headers: request.headers,
    body: request.body,
  };
  socketProvider.broadcast(echoResponse);
  return echoResponse;
}

module.exports = echo;
