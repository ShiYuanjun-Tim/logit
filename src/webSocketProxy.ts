/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';
import http = require("http");
import * as WebSocket from "ws";


function attachToServer(server:http.Server, path:string) {
  var WebSocketServer = WebSocket.Server;
  var wss = new WebSocketServer({
    server: server,
    path: path,
    port:9001
  });
  var debuggerSocket:WebSocket, clientSocket:WebSocket;

  function send(dest:WebSocket, message:any) {
    if (!dest) {
      return;
    }

    try {
      dest.send(message);
    } catch(e) {
      console.warn(e);
      // Sometimes this call throws 'not opened'
    }
  }

  wss.on('connection', function(ws:WebSocket) {
    /*const {url} = (<any>ws).upgradeReq;

    if (url.indexOf('role=debugger') > -1) {
      if (debuggerSocket) {
        ws.close(1011, 'Another debugger is already connected');
        return;
      }
      debuggerSocket = ws;
      debuggerSocket.onerror =
      debuggerSocket.onclose = () => {
        debuggerSocket = null as any;
        if (clientSocket) {
          clientSocket.close(1011, 'Debugger was disconnected');
        }
      };
      debuggerSocket.onmessage = ({data}) => send(clientSocket, data);
    } else if (url.indexOf('role=client') > -1) {
      if (clientSocket) {
        clientSocket.onerror = clientSocket.onclose = clientSocket.onmessage = null as any;
        clientSocket.close(1011, 'Another client connected');
      }
      clientSocket = ws;
      clientSocket.onerror =
      clientSocket.onclose = () => {
        clientSocket = null as any;
        send(debuggerSocket, JSON.stringify({method: '$disconnected'}));
      };
      clientSocket.onmessage = ({data}) => send(debuggerSocket, data);
    } else {
      ws.close(1011, 'Missing role param');
    }*/

    	ws.on('message', function incoming(message) {
        console.log('received: %s', message);
      });

  });

  return {
    server: wss,
    isChromeConnected: function() {
      return !!debuggerSocket;
    }
  };
}

export default attachToServer