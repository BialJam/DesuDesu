/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

class EndState extends Phaser.State {
    setScore(playerToScoreMap) {
        this.score = playerToScoreMap;
    }

    create() {
        if (this.score === undefined) {
            // DEBUG MODE
            this.score = new Map();
            this.score.set({ info: { id: 0, colorStr: '#12fe00' } }, 200);
            this.score.set({ info: { id: 1, colorStr: '#fff859' } }, 200);
            this.score.set({ info: { id: 2, colorStr: '#0decfe' } }, 200);
            this.score.set({ info: { id: 3, colorStr: '#fe544f' } }, 200);
        }
        console.log("EndState:");
        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background-menu');
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };

        let maxPts = Math.max.apply(null, Array.from(this.score.values()));
        console.log(maxPts);

        let winners = Array.prototype.filter.call(Array.from(this.score.entries()), ([player, score]) => score == maxPts);



        let winnerIdx = 1;
        this.game.add.bitmapText(center.x - 135, center.y - 245, 'font', 'WINNERS:', 60);
        for (let [player, score] of winners) {
            let playerScoreText = this.game.add.bitmapText(center.x - 350, center.y - 195 + winnerIdx * 70, 'font', 'Player ' + (player.info.id + 1) + ' score: ' + score, 48);
            playerScoreText.tint = '0x' + player.info.colorStr.replace('#', '');
            winnerIdx++;
        }
        this.game.add.bitmapText(center.x - 350, center.y + 200, 'font', 'Player 1 hit match button to replay!', 36);
    }
}

export default EndState;
