/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import Grid from 'objects/Grid';
import MapConsts from 'consts/MapConsts';
import Player from 'objects/Player';

class GameState extends Phaser.State {
    preload(){
		this.game.load.tilemap('myTileMap', 'assets/level11.json', null, Phaser.Tilemap.TILED_JSON);		
		this.game.load.image('myTiles', 'assets/tileset.png');
	}

    create() {
		this.players = [];
    	this.game.input.gamepad.start();
		this.game.input.gamepad.callbackContext = this;
		this.game.input.gamepad.onConnectCallback = this.addPlayer;

		var map = this.game.add.tilemap('myTileMap');
        map.addTilesetImage('tiles', 'myTiles');
        var layer = map.createLayer('layer');
        layer.resizeWorld();
        layer.wrap = true;
	}
	
	preload () {
		this.load.spritesheet('cursor', 'assets/cursor.png', 32, 32, 4);
	}
	
	addPlayer (id) {
		let c = this.players.length;
		let pData = MapConsts.StartingPositions[c];
		let pPad = this.game.input.gamepad['pad' + id];
		let p = new Player(this.game, pData.color, pPad, pData.x, pData.y);
		this.players.push(p);
	}
}

export default GameState;
