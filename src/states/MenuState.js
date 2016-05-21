/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

import MyButton from 'objects/Button';

class MenuState extends Phaser.State {

    preload() {
        // this.game.load.spritesheet('startBtn', 'assets/button.png', 120, 80);
        // this.game.load.image('background', 'assets/tile.png');

    }

    create() {
        this.game.add.tileSprite(0, 0, 800, 600, 'background-menu');
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };
        let startButton = new MyButton(this.game, center.x, center.y, 'startBtn-menu', startOnClick, this);
        startButton.addText('Rozpocznij grę', 24);

        this.players = [];
        this.game.input.gamepad.start();
        
        let pads = this.game.input.gamepad.padsConnected;
        
        console.log("connected pads: " + pads);
        if (pads > 0) {
            for (let i = 0; i < pads; ++i) {
                this.addPlayer(i);
            }
        }
                
        this.game.input.gamepad.callbackContext = this;
        this.game.input.gamepad.onConnectCallback = this.addPlayer;

        let infoPlayers = new Phaser.Text(this.game, 50, 25, 'Obecnie podłączeni gracze: ' + this.players.length, { font: "32px Arial", fill: "#ffffff" });
        infoPlayers.key = 'infoPlayersLabel';
        this.game.add.existing(infoPlayers);
    }

    addPlayer(id) {
        let c = this.players.length;
        let pData = MapConsts.StartingPositions[c];
        let pPad = this.game.input.gamepad['pad' + id];
        let p = new Player(this.game, pData.color, pPad, pData.x, pData.y);
        this.players.push(p);
        console.log("pad connected");
        infoPlayers.Text = 'Obecnie podłączeni gracze: ' + c;
    }
}

function startOnClick() {
    console.log('DUPA1');
    this.game.state.start('GameState');
}

export default MenuState;
