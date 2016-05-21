/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import Grid from 'objects/Grid';
import MapConsts from 'consts/MapConsts';
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
		this.playerObjects.push (new Player(this.game, playerInfo, pos.x, pos.y));
	}
}

export default GameState;
