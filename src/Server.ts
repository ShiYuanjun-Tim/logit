import * as WebSocket from "ws";
import  connect = require("connect");
import http = require("http");
import attachToServer from "./webSocketProxy"
import {Server} from "http";

const app = connect();
const WS_PORT = 9001;


const serverInstance:Server = <Server>http.createServer(app).listen(
	9000,
	function() {
		  attachToServer(serverInstance, '/message');
	}
);




//
//
// const wss: WebSocket.Server = new WebSocket.Server({port: WS_PORT,path:"/message"});
//
// wss.on('connection', function connection(ws) {
// 	ws.on('message', function incoming(message) {
// 		console.log('received: %s', message);
// 	});
//
// 	ws.send('something');
// });