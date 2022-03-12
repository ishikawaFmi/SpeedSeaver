const Sort = function(Utils, Players, Rooms) {
    this.utils = Utils;
    this.players = Players;
    this.rooms = Rooms;
};

//送られてきたJsonを処理する
Sort.prototype.SortMesage = function(msg, ws){

    var json = JSON.parse(msg);
    console.log(json);

    switch (json['State']) {
        case 0://Room処理
            switch (json['MethodName']) {
                case 'CreateRoom':
                    const roomName = JSON.parse(json['MethodData']);
                    const crateRoom = this.utils.crateRoom(ws,roomName['RoomName'], ws.uniqueId);

                    this.rooms.push(crateRoom);
                    
                    break;
            }
            break;

        case 1:

            break;

        case 2:

            break;
    }
}
module.exports = Sort;