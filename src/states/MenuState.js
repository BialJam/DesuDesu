/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

import MyButton from 'objects/Button';
import Player, {PlayerInfo} from 'objects/Player';

class MenuState extends Phaser.State {
    create() {
        this.game.add.tileSprite(0, 0, 960, 640, 'background-menu');
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
        let startButton = new MyButton(this.game, center.x, center.y, 'startBtn-menu', startOnClick, this);
        startButton.addText('Rozpocznij grę', 24);

        this.playersColors = ['0x12fe00', '0xfff859', '0x0decfe', '0xfe544f'];
        this.isActive = [false, false, false, false];
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

        // let playersInfo = new Phaser.Text(this.game, 50, 25, 'Obecnie podłączeni gracze: ' + this.game.players.length, { font: "32px Arial", fill: "#ffffff" });
        // this.game.add.existing(playersInfo);
        this.bluePlayer = this.game.add.button(256, 200, 'colorButtons', this.onClickBlue, this, 0, 0, 1);
        this.greenPlayer = this.game.add.button(384, 200, 'colorButtons', this.onClickGreen, this, 2, 2, 3);
        this.redPlayer = this.game.add.button(512, 200, 'colorButtons', this.onClickRed, this, 4, 4, 5);
        this.yellowPlayer = this.game.add.button(640, 200, 'colorButtons', this.onClickYellow, this, 6, 6, 7);
    }

    onClickRed() {
        console.log("red");
        this.redPlayer.frame = 5;
    }
    onClickBlue() {
        console.log("blue");
        this.bluePlayer.frame = 1;
    }
    onClickGreen() {
        console.log("green");
        this.greenPlayer.frame = 3;
    }
    onClickYellow() {
        console.log("yellow");
        this.yellowPlayer.frame = 7;
    }

    update() {
        if (this.game.players[0] != undefined) {
            var firstPadId = this.game.players[0].id;
            console.log('first pad id: ' + firstPadId);
        }
        if (this.isActive[0] === true && this.game.input.gamepad.supported && this.game.input.gamepad.active && this.game.input.gamepad['pad' + (firstPadId + 1)] && (this.game.input.gamepad['pad' + (firstPadId + 1)].isDown(Phaser.Gamepad.BUTTON_9) || this.game.input.gamepad['pad' + (firstPadId + 1)].isDown(Phaser.Gamepad.XBOX360_START) || this.game.input.gamepad['pad' + (firstPadId + 1)].isDown(Phaser.Gamepad.PS3XC_START))) {
            console.log('DUPA3');
            this.game.state.start('GameState');
        }
        for (let id = 0; id < this.game.input.gamepad.padsConnected; id++) {
            if (this.isActive[id] === false && this.game.input.gamepad.supported && this.game.input.gamepad.active && this.game.input.gamepad['pad' + (id + 1)] && (this.game.input.gamepad['pad' + (id + 1)].isDown(Phaser.Gamepad.BUTTON_1) || this.game.input.gamepad['pad' + (id + 1)].isDown(Phaser.Gamepad.BUTTON_0) || this.game.input.gamepad['pad' + (id + 1)].isDown(Phaser.Gamepad.BUTTON_2) || this.game.input.gamepad['pad' + (id + 1)].isDown(Phaser.Gamepad.BUTTON_3) || this.game.input.gamepad['pad' + (id + 1)].isDown(Phaser.Gamepad.XBOX360_A) || this.game.input.gamepad['pad' + (id + 1)].isDown(Phaser.Gamepad.XBOX360_B) || this.game.input.gamepad['pad' + (id + 1)].isDown(Phaser.Gamepad.XBOX360_X) || this.game.input.gamepad['pad' + (id + 1)].isDown(Phaser.Gamepad.XBOX360_Y) || this.game.input.gamepad['pad' + (id + 1)].isDown(Phaser.Gamepad.PS3XC_SQUARE) || this.game.input.gamepad['pad' + (id + 1)].isDown(Phaser.Gamepad.PS3XC_CIRCLE) || this.game.input.gamepad['pad' + (id + 1)].isDown(Phaser.Gamepad.PS3XC_TRIANGLE) || this.game.input.gamepad['pad' + (id + 1)].isDown(Phaser.Gamepad.PS3XC_X))) {
                this.isActive[id] = true;
                console.log('pad ' + id + ' active');
                let pPad = this.game.input.gamepad['pad' + (id + 1)];
                let p = new PlayerInfo(pPad, this.playersColors[id], id);
                this.game.players.push(p);
                if (this.game.players[0] != undefined) {
                    this.onClickBlue();
                }
                if (this.game.players[1] != undefined) {
                    this.onClickGreen();
                }
                if (this.game.players[2] != undefined) {
                    this.onClickRed();
                }
                if (this.game.players[3] != undefined) {
                    this.onClickYellow();
                }
            }
        }
    }

    addPlayer(id) {
        console.log("pad connected ", id);
    }
}

function startOnClick() {
    //console.log('DUPA1');
    this.game.state.start('GameState');
}

export default MenuState;
