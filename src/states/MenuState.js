/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

import MyButton from 'objects/Button';
import Player, {PlayerInfo} from 'objects/Player';

class MenuState extends Phaser.State {
    create() {
        // this.game.add.tileSprite(0, 0, 960, 640, 'background-menu');
        this.game.add.image(0, 0, 'bg');
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
        let resetBtn = this.game.add.button(center.x - 32, center.y + 225, 'colorButtons', () => {this.clearSettings(); this.saveSettings();}, this, 2, 2, 1, 2);
        this.playersColors = ['0x12fe00', '0xfff859', '0x0decfe', '0xfe544f'];
        this.buttons = ['any', 'up', 'down', 'left', 'right', 'action'];
        this.playerText = {};
        this.isActive = [false, false, false, false];
        this.game.input.gamepad.start();
        this.game.input.gamepad.addCallbacks(this, {
            onDown: this.padDownEvent
        });
        this.clearSettings();
        this.loadSettings();
    }

    update() {
    }

    playerInfoArray() {
        let players = [];
        for (let i = 0; i < this.playerz.length; ++i) {
            if (this.isActive[i])
                players.push(this.playerz[i]);
        }
        return players;
    }

    playerSettingsArray() {
        let players = [];
        for (let i = 0; i < this.playerz.length; ++i) {
            if (this.playerButtonId[i] == this.buttons.length)
                players.push(this.playerz[i]);
        }
        return players;
    }

    saveSettings() {
        if (typeof (Storage) === "undefined")
            return;
        localStorage.setItem("players", JSON.stringify(this.playerSettingsArray()));
        console.log("Saved players:");
        console.log(this.playerSettingsArray());
    }

    loadSettings() {
        if (typeof (Storage) === "undefined")
            return;
        this.playerz.length = 0;
        let players = JSON.parse(localStorage.getItem("players"));
        if (players == null) return;
        for (let i = 0; i < players.length; ++i) {
            players[i].id = i;
            this.playerButtonId[i] = this.buttons.length;
            this.playerNums++;
            this.playerz[i] = new PlayerInfo(players[i].padId, players[i].id, players[i].padMap, players[i].padAxisMap);
            this.registerButtonCallback(players[i], i);
            this.registerAxisCallback(players[i], i);
        }
        console.log("Loaded players.");
        console.log(this.playerSettingsArray());
    }

    clearSettings() {
        this.playerz = [];
        this.playerNums = 0;
        this.playerButtonId = {};
        this.playerButtons = [];

        for (let i = 0; i < 4; ++i) {
            let color = this.playersColors[i];
            if (this.playerText[i] === undefined) {
                this.playerText[i] = this.game.add.bitmapText(128, 250 + 16 + (i * 70), 'font', 'player' + (i + 1) + ' - press any button to join', 32);
                this.playerText[i].tint = color;
            }
            else {
                this.playerText[i].text = 'player' + (i + 1) + ' - press any button to join';
            }
            this.playerButtons[i] = this.add.sprite(32, 250 + (i * 70), 'colorButtons', 2);
            this.playerButtons[i].tint = color;
        }
        this.clearCallbacks();
    }

    clearCallbacks() {
        for (let i = 0; i < this.playerz.length; ++i) {
            let pPad = this.game.input.gamepad[this.playerz[i].padId];
            if (pPad)
                pPad.onDownCallback = null;
        }
    }

    addPlayer(id) {
        console.log("pad connected ", id);
    }

    registerButtonCallback(playerInfo, pId) {
        let pad = this.game.input.gamepad[playerInfo.padId];
        pad.addCallbacks(this, {
            onDown: x => {
                if (this.playerButtonId[pId] < this.buttons.length) {
                    let a = this.buttons[this.playerButtonId[pId]];
                    //
                    if (a !== 'any') {
                        if (playerInfo.padMap[x])
                            return;
                        playerInfo.padMap[x] = a;
                    }
                    this.playerButtonId[pId]++;
                    if (this.playerButtonId[pId] >= this.buttons.length) {
                        this.playerText[pId].text = "ready?";
                    }
                    else {
                        this.playerText[pId].text = this.buttons[this.playerButtonId[pId]];
                    }
                }
                else {
                    if (pId == 0 && this.isActive[0]) {
                        this.clearCallbacks();
                        this.game.players = this.playerInfoArray();
                        this.game.state.start('GameState');
                    }
                    else if (!this.isActive[pId]) {
                        this.playerText[pId].text = (pId == 0 ? "press 'action' to begin" : "ready!");
                        this.isActive[pId] = true;
                        this.playerButtons[pId].frame = 1;
                        this.saveSettings();
                    }
                }
                console.log(playerInfo.padMap);
            }
        });
    }

    registerAxisCallback(playerInfo, pId) {
        let pad = this.game.input.gamepad[playerInfo.padId];
        console.log(pad);
        pad.addCallbacks(this, {
            onAxis : (mysteryParameter, axis, state) => {
                if (state === 0) return;
                
                if (this.playerButtonId[pId] < this.buttons.length) {
                    let a = this.buttons[this.playerButtonId[pId]];
                    if (a !== 'any') {
                        playerInfo.padAxisMap[{
                            axis : axis,
                            state : state
                        }] = a;
                    }
                    this.playerButtonId[pId]++;
                    if (this.playerButtonId[pId] >= this.buttons.length) {
                        this.playerText[pId].text = "ready?";
                    }
                    else {
                        this.playerText[pId].text = this.buttons[this.playerButtonId[pId]];
                    }
                }
                else {
                    if (pId == 0 && this.isActive[0]) {
                        this.clearCallbacks();
                        this.game.players = this.playerInfoArray();
                        this.game.state.start('GameState');
                    }
                    else if (!this.isActive[pId]) {
                        this.playerText[pId].text = (pId == 0 ? "press 'action' to begin" : "ready!");
                        this.isActive[pId] = true;
                        this.playerButtons[pId].frame = 1;
                        this.saveSettings();
                    }
                }
            }
        });
    }

    padDownEvent(button, mysteryParameter, id) {
        let padId = 'pad' + (id + 1);
        for (let i = 0; i < this.playerz.length; ++i) {
            if (this.playerz[i].padId == padId)
                return;
        }

        console.log("new player");

        let pId = this.playerNums;
        this.playerz[pId] = new PlayerInfo(padId, pId, {}, {});
        this.playerButtonId[pId] = 0;
        this.playerNums++;
        this.registerButtonCallback(this.playerz[pId], pId);
    }
}

export default MenuState;
