const Player1 = null;

const Player2 = null;

function Room(player1, roomName, roomNamber) {
    this.Player1 = player1;
    this.RoomName = roomName;
    this.RoomNamber = roomNamber;
    this.RoomVisible = true;
    this.RoomPreparation = 0;
}

//ルーム内のプレイヤー全員に知らせる
Room.prototype.RoomSend = function (json) {
    this.Player1.send(json);
    this.Player2.send(json);
}

//ルームが削除されたことを知らせてプレイヤーのゲーム内ので使う変数の初期化
Room.prototype.RoomDelete = function () {
    this.Player1.CurrentRoom = null;
    this.Player1.isNotCard = null;
    this.Player2.CurrentRoom = null;
    this.Player2.isNotCard = null;

    const roomDeleteData = {};
    roomDeleteData['State'] = 'RoomDelete';

    const roomDeleteDataJson = JSON.stringify(roomDeleteData);
    this.RoomSend(roomDeleteDataJson);
}

module.exports = Room;