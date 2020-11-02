function echo(request) {
  const optionalProperties = getOptionalProperties(request);
  const echoResponse = {
    fullUrl: `${request.protocol}://${request.get("host")}${
      request.originalUrl
    }`,
    timestamp: Date().toString(),
    requestIps: [request.ip, ...optionalProperties["forwardedIps"]],
    method: request.method,
    requestQuery: request.query,
    headers: request.headers,
    body: request.body,
  };
  socketProvider.broadcast(echoResponse);
  console.log(echoResponse);
  return echoResponse;
}

function getOptionalProperties(request) {
  return {
    forwardedIps: request.headers["x-forwarded-for"]
      ? request.headers["x-forwarded-for"].split(",")
      : [],
  };
}

module.exports = echo;
