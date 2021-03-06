/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

var _ = require("underscore");

class EndState extends Phaser.State {
    setScore(playerToScoreMap) {
        this.score = playerToScoreMap;
    }

    create() {
        if (this.score === undefined) {
            // DEBUG MODE
            this.score = new Map();
            this.score.set({ info: { id: 0, colorStr: '#12fe00' } }, 200);
            this.score.set({ info: { id: 1, colorStr: '#fff859' } }, 175);
            this.score.set({ info: { id: 2, colorStr: '#0decfe' } }, 80);
            this.score.set({ info: { id: 3, colorStr: '#fe544f' } }, 300);
        }
        console.log("EndState:");
        this.game.add.sprite(0, 0, 'bgEnd');
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };

        let maxPts = Math.max.apply(null, Array.from(this.score.values()));
        console.log(maxPts);

        let winners = Array.prototype.filter.call(Array.from(this.score.entries()), ([player, score]) => score == maxPts);

        this.game.input.gamepad.start();
        this.game.input.gamepad.addCallbacks(this, {
            onDown: this.padDownEvent
        });

        let winnerIdx = 1;
        let sortedPlayers = _.sortBy(Array.from(this.score.entries()), function(e){
            return -e[1];
        });
        this.game.add.bitmapText(center.x - 125, center.y - 245, 'font', 'SCORES:', 60);
        for (let [player, score] of sortedPlayers) {
            let playerScoreText = this.game.add.bitmapText(center.x - 350, center.y - 195 + winnerIdx * 70, 'font', 'Player ' + (player.info.id + 1) + ' score: ' + score, 48);
            playerScoreText.tint = '0x' + player.info.colorStr.replace('#', '');
            winnerIdx++;
        }
        this.game.add.bitmapText(center.x - 350, center.y + 200, 'font', 'Player 1 hit action button to replay!', 36);

    }

    rematch() {
        window.location.reload(false);
    }

    padDownEvent(button) {
        let firstPad = this.game.players[0].padId;
        let firstPadMap = this.game.players[0].padMap;
        let pad = this.game.input.gamepad[firstPad];
        pad.addCallbacks(this, {
            onDown: x => {
                if(firstPadMap[x] === 'action') {
                    this.rematch();
                }
            }
        });
    }
}

export default EndState;
