/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

class MyButton extends Phaser.Button {

    constructor(game) {
        super(game);
    }

    create(x, y, key, callback) {
        this.game.add.button(x, y, key, callback);
    }
}

export default MyButton;