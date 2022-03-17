const WebSocket = require('ws').Server;
const wss = new WebSocket({ port: 5001 });

const Utils = require('./Utils.js');

const Rooms = new Array();

const Players = new Array();

const Sort = require('./Sort.js');

const sort = new Sort(Utils, Players, Rooms);

wss.on('connection', (ws, req) => {
    console.log('Sec');

    ws.ipAddres = ws._socket.remoteAddress;
    ws.port = ws._socket.remotePort;
    ws.uniqueId = new Date().getTime().toString();

    Players.push(ws);

    Utils.Rogin(ws.uniqueId, ws);
    Utils.RoomList(ws, Rooms);

    ws.on('message', msg => {
        sort.SortMesage(msg, ws);
    });
})


wss.on('close', () => {
    console.log('close');
    wss.close;
});

wss.on('listening', () => {
    console.log('serverlisteng');
});