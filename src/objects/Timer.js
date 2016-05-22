/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

class Timer extends Phaser.Sprite {
    constructor(game, PosX, PosY, key) {
        super(game);
        this.sprite = new Phaser.Sprite(game, PosX, PosY, key);
        game.add.existing(this);
        let timerText = this.game.add.bitmapText(480 - 24, 8, 'font', '99', 38);
        this.addChild(timerText);
    }

    changeTimer(timer) {
        this.removeChildren();
        let timerText = this.game.add.bitmapText(480 - 24, 8, 'font', timer, 38);
        this.addChild(timerText);
    }
}

export default Timer;