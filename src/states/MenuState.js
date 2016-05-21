/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

import MyButton from 'objects/Button';
import Player, {PlayerInfo} from 'objects/Player';

class MenuState extends Phaser.State {
    create() {
        // this.game.add.tileSprite(0, 0, 960, 640, 'background-menu');
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
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

        for (let i = 0; i < 4; ++i) {
            let color = this.playersColors[i];
            this.playerText[i] = this.game.add.bitmapText(128, 250 + 16 + (i * 70), 'font', 'player' + (i + 1) + ' - press any button to join', 32);
            this.playerText[i].tint = color;
            this.playerButtons[i] = this.add.sprite(32, 250 + (i * 70), 'colorButtons', 2);
            this.playerButtons[i].tint = color;
        }
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
            let pId = this.playerNums;
            this.playerz[id] = new PlayerInfo(pad, color, pId, padMap);
            this.playerButtonId[id] = 0;
            this.playerNums++;
            pad.addCallbacks(this, {
                onDown: x => {
                    if (this.playerButtonId[id] < this.buttons.length) {
                        let a = this.buttons[this.playerButtonId[id]];
                        padMap[a] = x;
                        this.playerButtonId[id]++;
                        if (this.playerButtonId[id] >= this.buttons.length) {
                            this.playerText[pId].text = "ready?";
                        }
                        else {
                            this.playerText[pId].text = this.buttons[this.playerButtonId[id]];
                        }
                    }
                    else if (x === padMap['action']) {
                        if (pId == 0 && this.isActive[0]) {
                            for (let k in this.playerz) {
                                this.game.players.push(this.playerz[k]);
                            }
                            this.game.state.start('GameState');
                        }
                        else {
                            this.playerText[pId].text = (pId == 0 ? "press 'action' to begin" : "ready!");
                            this.isActive[pId] = true;
                            this.playerButtons[pId].frame = 1;
                        }
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
