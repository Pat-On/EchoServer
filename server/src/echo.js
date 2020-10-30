function echo(request) {
  const echoResponse = {
    fullUrl: `${request.protocol}://${request.get("host")}${
      request.originalUrl
    }`,
    timestamp: Date().toString(),
    headers: request.headers,
    body: request.body,
  };
  socketProvider.broadcast(echoResponse);
  return echoResponse;
}

module.exports = echo;
