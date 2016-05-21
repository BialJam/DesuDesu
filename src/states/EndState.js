/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

class EndState extends Phaser.State {
    setScore(playerToScoreMap) {
        this.score = playerToScoreMap;
    }
    
    create() {
        if (this.score === undefined) {
            // DEBUG MODE
            this.score = new Map();
            this.score.set({info: {id: 0, colorStr: '#12fe00'}}, 100);
            this.score.set({info: {id: 1, colorStr: '#fff859'}}, 200);        
            this.score.set({info: {id: 2, colorStr: '#0decfe'}}, 200);
            this.score.set({info: {id: 3, colorStr: '#fe544f'}}, 50);         
        }
        console.log("EndState:");
        this.game.add.tileSprite(0, 0, 960, 640, 'background-menu');
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
        
        let maxPts = Math.max.apply(null, Array.from(this.score.values()));
        console.log(maxPts);
         
        let winners = Array.prototype.filter.call(Array.from(this.score.entries()), ([player, score]) => score == maxPts);
        
        
        
        let winnerIdx = 1;
        this.game.add.text( center.x - 150, center.y - 150, 'Winners:', { font: "48px Arial"});
        for (let [player, score] of winners) {
            this.game.add.text( center.x - 120, center.y - 150 + winnerIdx * 60, 'Player ' + (player.info.id  + 1)+ ' score: ' + score, { font: "48px Arial", fill: player.info.colorStr });
            winnerIdx++;
        }
    }
}

export default EndState;
