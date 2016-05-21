/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import Grid from 'objects/Grid';
import MapConsts from 'consts/MapConsts';
import Player, {PlayerInfo} from 'objects/Player';

class GameState extends Phaser.State {
    create() {
		this.players = [];
    	this.game.input.gamepad.start();
		this.game.input.gamepad.callbackContext = this;
		this.game.input.gamepad.onConnectCallback = this.addPlayer;

		this.createMap();
		this.addPlayerByInfo(new PlayerInfo(this.game.input.gamepad['pad' + 0], MapConsts.StartingPositions[0], 0));
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
	
	addPlayerByInfo (playerInfo) {
		let id = playerInfo.id;
		let pos = MapConsts.StartingPositions[id];
		console.log(this.game);
		this.players.push (new Player(this.game, playerInfo, pos.x, pos.y));
	}
}

export default GameState;
