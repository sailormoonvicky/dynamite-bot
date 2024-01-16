class Bot {
    constructor() {
        this.dynamiteUsed = 0;
        this.maxDynamite = 100;
    }

    makeMove(gameState) {

        let roundsPlayed = gameState.rounds.length;

        if (roundsPlayed === 0) {
            return ['R', 'P', 'S'][Math.floor(Math.random()*3)];
        }
    
        let p2RockUsed = gameState.rounds.filter(round => round.p2 === 'R').length;
        let p2PaperUsed = gameState.rounds.filter(round => round.p2 === 'P').length;
        let p2ScissorUsed = gameState.rounds.filter(round => round.p2 === 'S').length;

        let p2RockRate = p2RockUsed/roundsPlayed;
        let p2PaperRate = p2PaperUsed/roundsPlayed;
        let p2ScissorRate = p2ScissorUsed/roundsPlayed;

        let p2LastMove = gameState.rounds[roundsPlayed -1].p2;
        let p2DynamiteUsed = gameState.rounds.filter(round => round.p2 === 'D').length;
        if (p2DynamiteUsed < 100 && p2LastMove === 'D') {
            return 'W';
        }

        return this.weightedRandomMove(p2RockRate, p2PaperRate, p2ScissorRate);

        }

    weightedRandomMove(rockRate, paperRate, scissorRate) {
        let moveProbabilities = {
            'P': rockRate,
            'S': paperRate,
            'R': scissorRate
        }

        if (this.dynamiteUsed < this.maxDynamite) {
            moveProbabilities['D'] = rockRate + paperRate + scissorRate;
        }

        let move, total = 0, i, random = Math.random();
        for (move in moveProbabilities) {
            total+= moveProbabilities[move];
        }

        for (move in moveProbabilities) {
            if (random < moveProbabilities[move]/total) {
                if (move === 'D') {
                    this.dynamiteUsed++;
                }
                return move;
            }
            random -= moveProbabilities[move]/total;
        }

        if (this.dynamiteUsed < 100) {
            this.dynamiteUsed++;
            return 'D';
        }
        else {
            return 'R';
        }
    }

}

module.exports = new Bot();
