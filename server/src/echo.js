function echo(request) {
  const echoResponse = {
    fullUrl: `${request.protocol}://${request.get("host")}${
      request.originalUrl
    }`,
    timestamp: Date().toString(),
    requestIp: [request.ip, ...request.headers["x-forwarded-for"].split(",")],
    method: request.method,
    requestQuery: request.query,
    headers: request.headers,
    body: request.body,
  };
  socketProvider.broadcast(echoResponse);
  return echoResponse;
}

module.exports = echo;
