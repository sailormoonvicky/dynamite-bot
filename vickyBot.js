class Bot {
    constructor() {
        this.dynamiteUsed = 0;
        this.maxDynamite = 100;
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

        let total = 0; 
        let random = Math.random();
        for (let move in moveProbabilities) {
            total+= moveProbabilities[move];
        }


        for (let move in moveProbabilities) {
            if (random < moveProbabilities[move]/total) {
                if (move === 'D') {
                    this.dynamiteUsed++;
                }
                return move;
            }
            random -= moveProbabilities[move]/total;
        }
   

        return ['R', 'P', 'S'][Math.floor(Math.random()*3)];

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

        return this.weightedRandomMove(p2RockRate, p2PaperRate, p2ScissorRate);

    }

}

module.exports = new Bot();
