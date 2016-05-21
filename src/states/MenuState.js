/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

import MyButton from 'objects/Button';

class MenuState extends Phaser.State {

    preload() {
        this.game.load.spritesheet('startBtn', 'assets/button.png', 120, 80);
        this.game.load.image('background', 'assets/tile.png');

    }

    create() {
        this.game.add.tileSprite(0, 0, 800, 600, 'background');
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
        this.game.add.text(50, 25, 'Obecnie podłączeni gracze: 0', { font: "32px Arial", fill: "#ffffff" });
        let startButton = new MyButton(this.game, center.x, center.y, 'startBtn', startOnClick, this);
        startButton.addText('Rozpocznij grę', 24);
    }

}

function startOnClick() {
    console.log('DUPA1');
    this.game.state.start('GameState');
}

export default MenuState;
