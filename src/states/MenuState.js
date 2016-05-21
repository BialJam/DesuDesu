/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

import MyButton from 'objects/Button';
import Player, {PlayerInfo} from 'objects/Player';

class MenuState extends Phaser.State {
    create() {
        this.game.add.tileSprite(0, 0, 960, 640, 'background-menu');
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
        let startButton = new MyButton(this.game, center.x, center.y, 'startBtn-menu', startOnClick, this);
        startButton.addText('Rozpocznij grę', 24);

        this.playersColors = ['0xff0000', '0x00ff00', '0x0000ff', '0xff00ff'];
        this.game.input.gamepad.start();
        this.game.input.gamepad.callbackContext = this;
        this.game.input.gamepad.onConnectCallback = this.addPlayer;

        let pads = this.game.input.gamepad.padsConnected;

        console.log("connected pads: " + pads);
        if (pads > 0) {
            for (let i = 0; i < pads; ++i) {
                this.addPlayer(i);
            }
        }

        let playersInfo = new Phaser.Text(this.game, 50, 25, 'Obecnie podłączeni gracze: ' + this.game.players.length, { font: "32px Arial", fill: "#ffffff" });
        this.game.add.existing(playersInfo);
    }

    update() {
        if (this.game.input.gamepad.supported && this.game.input.gamepad.active && this.game.input.gamepad['pad1'] && this.game.input.gamepad['pad1'].isDown(Phaser.Gamepad.BUTTON_1) || this.game.input.gamepad['pad1'].isDown(Phaser.Gamepad.BUTTON_0) || this.game.input.gamepad['pad1'].isDown(Phaser.Gamepad.BUTTON_2) || this.game.input.gamepad['pad1'].isDown(Phaser.Gamepad.BUTTON_3) || this.game.input.gamepad['pad1'].isDown(Phaser.Gamepad.XBOX360_A) || this.game.input.gamepad['pad1'].isDown(Phaser.Gamepad.XBOX360_B) || this.game.input.gamepad['pad1'].isDown(Phaser.Gamepad.XBOX360_X) || this.game.input.gamepad['pad1'].isDown(Phaser.Gamepad.XBOX360_Y)) {
            console.log('DUPA3');
            this.game.state.start('GameState');
        }
    }

    addPlayer(id) {
        console.log("pad connected ", id);
        let pPad = this.game.input.gamepad['pad' + (id + 1)];
        let p = new PlayerInfo(pPad, this.playersColors[id], id);
        this.game.players.push(p);
    }
}

function startOnClick() {
    //console.log('DUPA1');
    //this.game.state.start('GameState');
}

export default MenuState;
