# Echo Server

Echo server is an instrumentation tool used for testing HTTP requests sent from clients.
Any request sent to the echo server will be diplayed on the echo UI for easy review.

## Install and Run

- In the server folder run: `npm install`

- In the echo-client folder run:

  - `npm install`
  - `npm run build`

- Server is listening at `localhost:3001`
- Access the echo UI from: `localhost:3001/echo-ui`

- Send a request to the server. For example, using the browser: `localhost:3001/test`

* See that the request details is displayed in the echo UI.
