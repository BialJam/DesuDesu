/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import MapConsts from 'consts/MapConsts';

class ScoreTable extends Phaser.Sprite {
    constructor(game, PosX, PosY, key) {
        super(game);
        this.sprite = new Phaser.Sprite(game, PosX, PosY, key);
        game.add.existing(this);
        
        let p1Score = new Phaser.Text(game, 262 - 24 - 64 - 32, 12, '0', { font: "24px Arial", fill: "#ffffff" });
        this.addChildAt(p1Score, 0);
        let p2Score = new Phaser.Text(game, 390 - 24 - 64, 12, '0', { font: "24px Arial", fill: "#ffffff" });
        this.addChildAt(p2Score, 1);
        let p3Score = new Phaser.Text(game, 518 - 24 + 64, 12, '0', { font: "24px Arial", fill: "#ffffff" });
        this.addChildAt(p3Score, 2);
        let p4Score = new Phaser.Text(game, 646 - 24 + 64 + 32, 12, '0', { font: "24px Arial", fill: "#ffffff" });
        this.addChildAt(p4Score, 3);
        
        let p1Pad = new Phaser.Sprite(game, 262 + 24 - 64 - 32, 6, 'pad');
        p1Pad.tint = MapConsts.StartingPositions[0].colorNum;
        this.addChild(p1Pad, 4);
        let p2Pad = new Phaser.Sprite(game, 390 + 24 - 64, 6, 'pad');
        p2Pad.tint = MapConsts.StartingPositions[1].colorNum;
        this.addChild(p2Pad, 5);
        let p3Pad = new Phaser.Sprite(game, 518 + 24 + 64, 6, 'pad');
        p3Pad.tint = MapConsts.StartingPositions[2].colorNum;
        this.addChild(p3Pad, 6);
        let p4Pad = new Phaser.Sprite(game, 646 + 24 + 64 + 32, 6, 'pad');
        p4Pad.tint = MapConsts.StartingPositions[3].colorNum;
        this.addChild(p4Pad, 7);
    }

    changeScore(player, score) {
        if (player === 0) {
            let p1Score = this.getChildAt(0);
            p1Score.text = score;
            this.removeChildAt(0);
            this.addChildAt(p1Score, 0);
        }
        if (player === 1) {
            let p2Score = this.getChildAt(1);
            p2Score.text = score;
            this.removeChildAt(1);
            this.addChildAt(p2Score, 1);
        }
        if (player === 2) {
            let p3Score = this.getChildAt(2);
            p3Score.text = score;
            this.removeChildAt(2);
            this.addChildAt(p3Score, 2);
        }
        if (player === 3) {
            let p4Score = this.getChildAt(3);
            p4Score.text = score;
            this.removeChildAt(3);
            this.addChildAt(p4Score, 3);
        }
    }
}

export default ScoreTable;