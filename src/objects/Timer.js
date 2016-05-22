/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

class Timer extends Phaser.Sprite {
    constructor(game, PosX, PosY, key) {
        super(game);
        this.sprite = new Phaser.Sprite(game, PosX, PosY, key);
        game.add.existing(this);
        let timerText = new Phaser.Text(this.game, 480 - 18, 7, '99', { font: "32px Arial", fill: "#ffffff" });
        this.addChild(timerText);
    }

    changeTimer(timer) {
        this.removeChildren();
        let timerText = new Phaser.Text(this.game, 480 - 18, 7, timer, { font: "32px Arial", fill: "#ffffff" });
        this.addChild(timerText);
    }
}

export default Timer;