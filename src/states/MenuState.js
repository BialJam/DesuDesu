/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

import MyButton from 'objects/Button';
import Player, {PlayerInfo} from 'objects/Player';

class MenuState extends Phaser.State {
    create() {
        this.game.add.tileSprite(0, 0, 960, 640, 'background-menu');
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
        let startButton = new MyButton(this.game, 356, center.y, 'startGameSpritesheet', startOnClick, this, 0, 0, 1);

        this.playersColors = ['0x12fe00', '0xfff859', '0x0decfe', '0xfe544f'];
        this.buttons = ['any', 'up', 'down', 'left', 'right', 'action'];
        this.isActive = [false, false, false, false];
        this.game.input.gamepad.start();
        this.game.input.gamepad.addCallbacks(this, {
            onDown: this.padDownEvent
        });
        this.playerz = {};
        this.playerNums = 0;
        this.playerText = {};
        this.playerButtonId = {};
        this.playerButtons = [];
    }

    update() {
    }

    addPlayer(id) {
        console.log("pad connected ", id);
    }

    padDownEvent(button, mysteryParameter, id) {
        if (!(id in this.playerz)) {
            console.log("new player");
            let pad = this.game.input.gamepad['pad' + (id + 1)];
            let color = this.playersColors[this.playerNums];
            let padMap = {};
            this.playerNums++;
            this.playerz[id] = new PlayerInfo(pad, color, this.playerNums, padMap);
            this.playerButtonId[id] = 0;
            this.playerText[id] = this.game.add.bitmapText(128, 250 + ((this.playerNums - 1) * 32), 'font', 'player' + this.playerNums, 32);
            this.playerText[id].tint = color;
            pad.addCallbacks(this, {
                onDown: x => {
                    if (this.playerButtonId[id] < this.buttons.length) {
                        let a = this.buttons[this.playerButtonId[id]];
                        padMap[a] = x;
                        console.log(x);
                        console.log(padMap);
                        this.playerButtonId[id]++;
                        if (this.playerButtonId[id] + 1 > this.buttons.length) {
                            this.playerText[id].text = "press 'action' to begin!";
                        }
                        else {
                            this.playerText[id].text = this.buttons[this.playerButtonId[id]];
                        }
                    }
                    else if (x === padMap['action']) {
                        this.playerText[id].text = "ready!";
                        this.isActive[id] = true;
                    }
                }
            });
        }
    }
}

function startOnClick() {
    //console.log('DUPA1');
    this.game.state.start('GameState');
}

export default MenuState;
