class Bot {
    makeMove(gamestate) {
        var moves = ['R', 'P', 'S', 'W', 'D'];
        var random = Math.floor(Math.random() * 5);
        return moves[random];
    }
}

module.exports = new Bot();
