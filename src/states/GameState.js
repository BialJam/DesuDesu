/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import Grid from 'objects/Grid';
import MapConsts from 'consts/MapConsts';
import Player from 'objects/Player';
import Map from 'objects/Map';

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
		this.mapa = new Map(this.game, 10, 10);
	}
}

export default GameState;
