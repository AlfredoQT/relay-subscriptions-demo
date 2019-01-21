/* @flow */

const WebSocket = require('ws');
const http = require('http');
const https = require('https');
const { Buffer } = require('buffer');

type VerifyClientInfo = {
  origin: string,
  req: http.IncomingMessage,
  secure: boolean
};

type ZlibOptions = {
  flush?: number,
  finishFlush?: number,
  chunkSize?: number,
  level?: number,
  windowBits?: number,
  memLevel?: number,
  strategy?: number,
  info?: boolean,
  dictionary?:
    | Buffer
    | DataView
    | ArrayBuffer
    | Float32Array
    | Float64Array
    | Int16Array
    | Int32Array
    | Int8Array
};

type PerMessageDeflate = {
  serverNoContextTakeover?: boolean,
  clientNoContextTakeover?: boolean,
  serverMaxWindowBits?: number,
  clientMaxWindowBits?: number,
  zlibDeflateOptions?: ZlibOptions,
  zlibInflateOptions: ZlibOptions,
  threshold?: number,
  concurrencyLimit?: number
};

// Just to have this options here
type ServerOptions = {
  host?: string,
  port?: number,
  server?: http.Server | https.Server,
  clientTracking?: boolean,
  backlog?: number,
  verifyClient?: (
    info: VerifyClientInfo,
    cb?: (result: boolean, code: false, name: string, headers: mixed) => void
  ) => boolean,
  handleProtocols?: (
    protocols: Array<string>,
    request: http.IncomingMessage
  ) => string | boolean,
  path?: string,
  noServer?: boolean,
  perMessageDeflate?: boolean | PerMessageDeflate,
  maxPayload?: number
};

class SubscriptionServer {
  constructor(options: ServerOptions) {
    if (
      options.port === undefined &&
      options.server === undefined &&
      options.noServer === undefined
    ) {
      throw new Error('Port or server or noServer must be provided');
    }
    const wsServer = new WebSocket.Server(options);
    // Connection handler for every new socket
    const connectionHandler = (
      socket: WebSocket,
      request: http.IncomingMessage
    ): void => {
      console.log(socket);
    };

    wsServer.on('connection', connectionHandler);
  }
}

module.exports = SubscriptionServer;
