const Player = require('./Player');
var Room = require('./Room');

var RoomList = function (Utils) {
    this.roomList = [];
    this.roomIdList = [];
    this.utils = Utils;
}

// ルームリストを返す
RoomList.prototype.GetRoomList = function () {
    return this.roomList;
}

// ルームリストにルームを追加する
RoomList.prototype.SetRoomList = function (value) {
    this.roomList.push(value);
}

// ルームIDに応じたルームを返す
RoomList.prototype.GetRoom = function (values) {
    var room;
    this.roomList.forEach(x => {
        if (x.RoomID == values) {
            room = x;
        }
    })
    return room;
}

// ルームを作成する
RoomList.prototype.CreateRoom = function (roomName) {
    let room = new Room(this.NewRoomID(), 2, roomName);
    this.SetRoomList(room);
    return room;
}

RoomList.prototype.SendRoomList = function (playerList, port, address, server) {
    var currentRoomList = [];

    this.roomList.forEach(room => {
        if (room.RoomVisible) currentRoomList.push(room); // RoomVisibleがtrueの場合のみ追加する
    })

    var data = {};
    data['State'] = 'RoomList';
    data['RoomList'] = currentRoomList;
    if (currentRoomList.length >= 1) {
        var players = playerList.GetPlayerList();
        var js = JSON.stringify(data);

        players.forEach(player => {
            if (player.CurrentRoom == null) {
                this.utils.SendJson(js, player.PlayerPort, player.PlayerAddres, server);
            }
        });

    }
}

RoomList.prototype.NewRoomID = function () {
    var id = this.roomIdList.length + 1;

    this.roomIdList.push(id);
    return id;
}

RoomList.prototype.Delete = function (roomId) {
    this.roomList = this.roomList.filter(id => {
        return id.RoomID != roomId;
    });

    this.roomIdList = this.roomIdList.filter(id => {
        return id != roomId;
    });
}

module.exports = RoomList;