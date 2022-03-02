const Player = require('./Player');

const PlayerList = function (Utils) {
    this.playerList = [];
    this.PlayerIdList = [];
    this.utils = Utils;
}

PlayerList.prototype.GetPlayerList = function () {
    return this.playerList;
}

PlayerList.prototype.SetPlayerList = function (value) {
    this.playerList.push(value);
}

PlayerList.prototype.GetPlayer = function (value) {
    var returnPlayer;
    this.playerList.forEach(player => {
        if (player.PlayerId == value) {
            returnPlayer = player;
        }
    });
    return returnPlayer;
}

PlayerList.prototype.CreatePlayer = function (playerId, port, address, server) {
    let player = new Player(playerId, port, address);
    this.PlayerIdList.push(playerId);
    this.SetPlayerList(player);
}

PlayerList.prototype.Delete = function (playerId) {
    this.playerList = this.playerList.filter(id => {
        return id.PlayerId != playerId;
    })

    this.PlayerIdList = this.PlayerIdList.filter(id => {
        return id != playerId;
    })
}
module.exports = PlayerList;