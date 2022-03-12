const Player1 = null;

const Player2 = null;

function Room(player1, roomName, roomNamber) {
    this.Player1 = player1;
    this.RoomName = roomName;
    this.RooomNamber = roomNamber;
    this.RoomVisible = true;
}

Room.prototype.RoomSend = (json) => {
Player1.send(json);
Player2.send(json);
}

module.exports = Room;