/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import Grid from 'objects/Grid';
import MapConsts from 'consts/MapConsts';
import Map from 'objects/Map';
import Player, {PlayerInfo} from 'objects/Player';

class GameState extends Phaser.State {
    create() {
		this.playerObjects = [];
		this.createMap();
		for (let i = 0; i < this.game.players.length; ++i) {
			this.addPlayerByInfo(this.game.players[i]);
		}
	}
	
	createMap(){
		this.mapa = new Map(this.game, 10, 10);
	}
	
	addPlayerByInfo (playerInfo) {
		let id = playerInfo.id;
		let pos = MapConsts.StartingPositions[id];
		console.log(this.game);
		this.playerObjects.push (new Player(this.game, playerInfo, pos.x, pos.y));
	}
}

export default GameState;
