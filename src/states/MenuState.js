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
        this.buttons = ['up', 'down', 'left', 'right', 'action'];
        this.isActive = [false, false, false, false];
        this.game.input.gamepad.start();
        this.game.input.gamepad.addCallbacks(this, {
            onDown : this.padDownEvent
        });
        this.playerz = {};
        this.playerNums = 0;
        this.playerText = {};
        this.playerButtonId = {};
    }

    update() {
        
    }

    addPlayer(id) {
        console.log("pad connected ", id);
    }
    
    padDownEvent (button, mysteryParameter, id) {
        if (!(id in this.playerz)) {
            console.log("new player");
            let pad = this.game.input.gamepad['pad' + (id + 1)];
            let color = this.playersColors[this.playerNums];
            let padMap = {};
            this.playerNums++;
            this.playerz[id] = new PlayerInfo(pad, color, this.playerNums, padMap);
            this.playerButtonId[id] = 0;
            this.playerText[id] = this.game.add.bitmapText(48, 4 + ((this.playerNums - 1) *32), 'font', this.buttons[0], 32);
            this.playerText[id].tint = color;
            pad.addCallbacks(this, {
                onDown : x => {
                    padMap[this.buttons[this.playerButtonId]] = x;
                    this.playerButtonId[id]++;
                    this.playerText[id].text = this.buttons[this.playerButtonId[id]];
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
