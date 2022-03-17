const Sort = function (Utils, Players, Rooms) {
    this.utils = Utils;
    this.players = Players;
    this.rooms = Rooms;
};

//送られてきたJsonを処理する
Sort.prototype.SortMesage = function (msg, ws) {

    var json = JSON.parse(msg);
    console.log(json);

    switch (json['State']) {
        case 0://ネットワークの処理(ログアウト等)
            switch (json['MethodName']) {
                case 'Rogout':
                    this.utils.Rogout(ws, this.players, this.rooms);
                    break;
            }
            break;
        case 1://ルームの処理
            switch (json['MethodName']) {
                case 'CreateRoom':
                    const createRoomJson = JSON.parse(json['MethodData']);
                    const createRoom = this.utils.CreateRoom(ws, createRoomJson['RoomName'], ws.uniqueId);

                    ws.currentRoom = createRoom;

                    this.rooms.push(createRoom);
                    break;
                case 'EnterRoom':
                    const enterRoomJson = JSON.parse(json['MethodData']);
                    console.log(enterRoomJson);
                    this.rooms.forEach(room => {
                        if (room.RoomNamber == enterRoomJson['RoomNamber']) {
                            room.Player2 = ws;
                            room.RoomVisible = false;
                            ws.currentRoom = room;

                            const gameSceneLoadData = {};
                            gameSceneLoadData['State'] = 'GameSceneLoad'

                            const gameSceneLoadDataJson = JSON.stringify(gameSceneLoadData);

                            room.RoomSend(gameSceneLoadDataJson)
                        }
                    });

                    break;
                case 'GameScene':
                    const room = ws.currentRoom;
                    console.log(ws.currentRoom)
                    room.RoomPreparation++;

                    if (room.RoomPreparation >= 2) {
                        const gameStartData = {};
                        gameStartData['State'] = 'GameStart';

                        const gameStartDataJson = JSON.stringify(gameStartData);
                        room.RoomSend(gameStartDataJson);
                    }
                    break;
            }
            break;
        case 2://ゲーム内の処理
            switch (json['MethodName']) {
                case 'IncetanceCard':
                    var incetanceCard = JSON.parse(json['MethodData']);

                    const incetanceCardData = {};
                    incetanceCardData['State'] = 'IncetanceCard';
                    incetanceCardData['Index'] = incetanceCard['Index'];
                    incetanceCardData['Suit'] = incetanceCard['Suit'];

                    const incetanceCardDataJson = JSON.stringify(incetanceCardData);

                    ws.currentRoom.RoomSend(incetanceCardDataJson);
                    break;
                case 'ChengeCard':
                    const chengeCard = JSON.parse(json['MethodData']);

                    const chengeCardData = {};
                    chengeCardData['State'] = 'ChengeCard';
                    chengeCardData['BeforeIndex'] = chengeCard['BeforeIndex'];
                    chengeCardData['BeforeSuit'] = chengeCard['BeforeSuit'];
                    chengeCardData['AftereIndex'] = chengeCard['AfterIndex'];
                    chengeCardData['AfterSuit'] = chengeCard['AfterSuit'];

                    const chengeCardDataJson = JSON.stringify(chengeCardData);

                    ws.currentRoom.RoomSend(chengeCardDataJson);
                    break;
                case 'NotCard':
                    const room = ws.currentRoom;

                    ws.isNotCard = true;

                    if (room.Player1.isNotCard == true && room.Player2.isNotCard == true) {
                        room.Player1.isNotCard = false;
                        room.Player2.isNotCard = false;

                        const notCardData = {};
                        notCardData['State'] = 'NotCard';

                        const notCardDataJson = JSON.stringify(notCardData);
                        room.RoomSend(notCardDataJson);
                    }
                    break;
                case 'CheakWin':
                    const CheakWinData = {};
                    CheakWinData['State'] = 'CheakWin';


                    const CheakWinDataJson = JSON.stringify(CheakWinData);

                    if (ws.currentRoom.Player1 == ws) {
                        ws.currentRoom.Player2.send(CheakWinDataJson);
                    } else {
                        ws.currentRoom.Player1.send(CheakWinDataJson);
                    }
                    break;
                case 'SendWin':
                    const SendWinData = {};
                    SendWinData['State'] = 'CheakWin';

                    const SendWinDataJson = JSON.stringify(SendWinData);

                    if (ws.currentRoom.Player1 == ws) {
                        SendWinData['WinOrLose'] = 'Win';
                        ws.currentRoom.Player2.send(SendWinDataJson);

                        SendWinData['WinOrLose'] = 'Loose';
                        ws.currentRoom.Player1.send(SendWinDataJson);
                    } else {
                        SendWinData['WinOrLose'] = 'Loose';
                        ws.currentRoom.Player1.send(SendWinDataJson);
                        
                        SendWinData['WinOrLose'] = 'Win';
                        ws.currentRoom.Player1.send(SendWinDataJson);
                    }
                    break;
            }
            break;
    }
}

module.exports = Sort;