const Room = require("./Room");

//ログインしたことを知らせIDを送る
exports.rogin = (Id, ws) => {
    var roginData = {};
    roginData['State'] = "Rogin"
    roginData['Id'] = Id;

    var json = JSON.stringify(roginData);
    ws.send(json);
}

//新しくルームを生成する
exports.crateRoom = (ws, roomName, roomNamber) => {
    const room = new Room(ws, roomName, roomNamber);
    return room;
}

//現在の参加可能なルームを送る
exports.roomList = (ws, rooms) => {
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
    ws.send(json);
}

//ルームの送らない情報を省く
function replacer(key, value) {
    if (key === 'Player1' || key === 'Player2' || key === 'RoomVisible') {
        return undefined;
    }
    return value;
}