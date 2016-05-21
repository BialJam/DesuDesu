/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

class MyButton extends Phaser.Button {

    constructor(game, x, y, key, callback, context) {
        super(game, x, y, key, callback, context);
        game.add.existing(this);
    }

    addText(text2, fontSize) {
        let text = new Phaser.Text(this.game, 0, 0, text2, { font: fontSize +"px Arial", fill: "#ffffff" });
        this.addChild(text);
    }

}

export default MyButton;