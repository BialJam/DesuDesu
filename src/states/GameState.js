/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import Grid from 'objects/Grid';
import MapConsts from 'consts/MapConsts';
import Player from 'objects/Player';

class GameState extends Phaser.State {
    create() {
		this.players = [];
    	this.game.input.gamepad.start();
		this.game.input.gamepad.callbackContext = this;
		this.game.input.gamepad.onConnectCallback = this.addPlayer;

		this.createMap();
	}
	
	addPlayer (id) {
		let c = this.players.length;
		let pData = MapConsts.StartingPositions[c];
		let pPad = this.game.input.gamepad['pad' + id];
		let p = new Player(this.game, pData.color, pPad, pData.x, pData.y);
		this.players.push(p);
	}
	
	createMap(){
		var map = this.game.add.tilemap('myTileMap');
        map.addTilesetImage('tileset', 'tiles');
        var layer = map.createLayer('tiles');
        layer.resizeWorld();
        layer.wrap = true;
	}
}

export default GameState;
