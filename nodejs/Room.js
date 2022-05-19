const Player1 = null;

const Player2 = null;

const RoomNamber = null;

function Room(player1, roomName, roomNamber) {
    this.Player1 = player1;
    this.RoomName = roomName;
    this.RoomNamber = roomNamber;
    this.RoomVisible = true;
    this.RoomPreparation = 0;
}

//ルーム内のプレイヤー全員に知らせる
Room.prototype.RoomSend = function (json) {
    if (this.Player1 != null) {
        this.Player1.send(json);
    }
    if (this.Player2 != null) {
        this.Player2.send(json);
    }
}

//ルームが削除されたことを知らせてプレイヤーのゲーム内で使う変数の初期化
Room.prototype.RoomDelete = function () {
    if (this.Player1 != null) {
        this.Player1.currentRoom = null;
        this.Player1.isNotCard = null;
    }
    if (this.Player2 != null) {
        this.Player2.currentRoom = null;
        this.Player2.isNotCard = null;
    }

    const roomDeleteData = {};
    roomDeleteData['State'] = 'RoomDelete';

    const roomDeleteDataJson = JSON.stringify(roomDeleteData);
    this.RoomSend(roomDeleteDataJson);
}

module.exports = Room;