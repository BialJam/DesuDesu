/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import Grid from 'objects/Grid';
import MapConsts from 'consts/MapConsts';
import GameMap from 'objects/GameMap';
import Player, {PlayerInfo} from 'objects/Player';
import Timer from 'objects/Timer';

class GameState extends Phaser.State {
    create() {
		this.playerObjects = [];
		this.countdown = 99;
		this.createMap();
		for (let i = 0; i < this.game.players.length; ++i) {
			this.addPlayerByInfo(this.game.players[i]);
		}
		this.timerLabel = new Timer(this.game, 200, 200, 'timer');
		this.timerStart();
	}

	createMap() {
		this.mapa = new GameMap(this.game, 10, 10);
	}

	addPlayerByInfo(playerInfo) {
		let id = playerInfo.id;
		let pos = MapConsts.StartingPositions[id];
		this.playerObjects.push(new Player(this.game, playerInfo, pos.x, pos.y));
	}
	timerStart() {
		let timer = this.game.time.create(false);
		timer.loop(1000, this.updateTimer, this);
		timer.start();
	}

	updateTimer() {
		this.countdown--;
        console.log("Timer: " + this.countdown);
		this.timerLabel.changeTimer(this.countdown);
	}
	tileAt(targetTileX, targetTileY) {
		return this.mapa.tileAt(targetTileX, targetTileY);
	}

	playerTile(player) {
		return tileAt(player.targetTileX, player.targetTileY);
	}

	playersScore() {
		return this.mapa.scores();
	}

	divideInto(player, targetTileX, targetTileY) {
		let srcTile = playerTile(player);
		let targetTile = tileAt(targetTileX, targetTileY);
		if (!targetTile.isHabitable())
			return;

		let healthToMove = Math.floor(targetTile.health / 2);
		if (healthToMove == 0) {
			return;
		}

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
