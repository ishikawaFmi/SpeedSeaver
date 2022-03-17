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
exports.Rogout = function (ws, players, rooms) {
    players = players.filter(player => {
        if (player == ws) {
            return player != ws;
        }
    });

    rooms = rooms.filter(room => {
        if (room == ws.currentRoom) {
            return room != ws.currentRoom;
        }
    });

    if (ws.CurrentRoom != null) {
        ws.CurrentRoom.RoomDelete();
    }
}

//新しくルームを生成する
exports.CreateRoom = function (ws, roomName, roomNamber) {
    const room = new Room(ws, roomName, roomNamber);
    return room;
}

//現在の参加可能なルームを送る
exports.RoomList = function (ws, rooms, players) {
    const currentRoomlist = new Array();

    rooms.forEach(room => {
        if (room.RoomVisible == true) {
            currentRoomlist.push(room);
        }
    });

    var roomListData = {};
    roomListData['State'] = "RoomList"
    roomListData['RoomList'] = currentRoomlist;

    var json = JSON.stringify(roomListData, replacer);
    
    players.forEach(player => {
        if (player.currentRoom == null) {
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