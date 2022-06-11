const Room = require("./Room");

//ログインしたことを知らせてIDを送る
exports.Rogin = function (Id, ws) {
    const roginData = {};
    roginData['State'] = "Rogin"
    roginData['Id'] = Id;

    const roginDataJson = JSON.stringify(roginData);
    ws.send(roginDataJson);
}

//ログアウトしたらプレイヤーとルームのリストから排除する
exports.Rogout = function (ws, rooms, players) {
    if (ws.currentRoom != null) {
        ws.currentRoom.RoomDelete();
    }
    rooms = rooms.filter(room => {
        if (ws.currentRoom != null || ws.currentRoom != undefined) {
            return room.RoomNamber != ws.currentRoom.RoomNamber;
        }
    });

    players = players.filter(player => {
        if (ws != null || ws != undefined) {
            return player != ws;
        }
    });
}

//新しくルームを生成する
exports.CreateRoom = function (ws, roomName, roomNamber) {
    const room = new Room(ws, roomName, roomNamber);
    return room;
}

exports.ExitRoom = function (ws, rooms) {
         return rooms = rooms.filter(room => {
        return room.RoomNamber != ws.currentRoom.RoomNamber;
    });
   
}

//現在の参加可能なルームを送る
exports.RoomList = function (rooms, players) {
    const currentRoomlist = new Array();

    rooms.forEach(room => {
        console.log(room);
        if (room.RoomVisible == true) {
            currentRoomlist.push(room);
        }
    });

    var roomListData = {};
    roomListData['State'] = "RoomList"
    roomListData['RoomList'] = currentRoomlist;

    var json = JSON.stringify(roomListData, replacer);

    players.forEach(player => {
        if (player.currentRoom == null || player.currentRoom == undefined) {
            player.send(json);
        }
    });
}

//ルームの送らない情報を省く
function replacer(key, value) {
    if (key === 'Player1' || key === 'Player2' || key === 'RoomVisible') {
        return undefined;
    }
    return value;
}