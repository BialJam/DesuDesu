/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

class ScoreTable extends Phaser.Sprite {
    constructor(game, PosX, PosY, key) {
        super(game);
        this.sprite = new Phaser.Sprite(game, PosX, PosY, key);
        game.add.existing(this);
        let p1Score = new Phaser.Text(game, 0, 0, '0', { font: "24px Arial", fill: "0x12fe00" });
        this.addChildAt(p1Score, 0);
        let p2Score = new Phaser.Text(game, 50, 0, '0', { font: "24px Arial", fill: "0xfff859" });
        this.addChildAt(p2Score, 1);
        let p3Score = new Phaser.Text(game, 100, 0, '0', { font: "24px Arial", fill: "0x0decfe" });
        this.addChildAt(p3Score, 2);
        let p4Score = new Phaser.Text(game, 150, 0, '0', { font: "24px Arial", fill: "0xfe544f" });
        this.addChildAt(p4Score, 3);
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