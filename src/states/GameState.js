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
		this.playerObjects.push (new Player(this.game, playerInfo, pos.x, pos.y));
	}
	
	tileAt(targetTileX, targetTileY) {
		return this.mapa.tileAt(targetTileX, targetTileY);
	}
	
	playerTile(player) {
		return tileAt(player.targetTileX, player.targetTileY);
	}
	
	divideInto(player, targetTileX, targetTileY) {
		let srcTile = playerTile(player);
		let targetTile = tileAt(targetTileX, targetTileY);
		if (!targetTile.isHabitable())
			return;
		
		let healthToMove = Math.floor(targetTile.health / 2);
		if (healthToMove == 0)
			return;
		
		if (targetTile.isFree() || player.ownsTile(targetTile)) {
			srcTile.depopulate(healthToMove);
			targetTile.populate(player, healthToMove);
		}
		else {
			
			let healthToTake = Math.min(targetTile.health, healthToMove);
			srcTile.depopulate(healthToMove);
			targetTile.depopulate(healthToTake);
			let healthToPopulate = healthToMove - healthToTake;
			if (healthToPopulate > 0) {
				targetTile.populate(player, healthToPopulate);
			}
		}
	}
	
	
	
}

export default GameState;
