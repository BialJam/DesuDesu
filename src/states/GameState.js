/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import Grid from 'objects/Grid';
import MapConsts from 'consts/MapConsts';
import GameMap from 'objects/GameMap';
import ScoreTable from 'objects/ScoreTable';
import Player, {PlayerInfo} from 'objects/Player';
import Timer from 'objects/Timer';


class GameState extends Phaser.State {
    create() {
		this.game.add.image(0, 0, 'bgFrame');
		this.playerObjects = [];
		this.countdown = 99;
		this.createMap();
		for (let i = 0; i < this.game.players.length; ++i) {
			this.addPlayerByInfo(this.game.players[i]);
		}
		this.timerLabel = new Timer(this.game, 200, 200, 'timer');
		this.timerStart();
		this.scoreTable = new ScoreTable(this.game, 300, 300, 'scoreTable');
		this.scoreTable.changeScore(0, 20);
		this.scoreTable.changeScore(1, 0);
		this.scoreTable.changeScore(2, 55);
		this.scoreTable.changeScore(3, 99);
		this.attackSound = this.game.add.audio('attackSound');
        this.divideSound = this.game.add.audio('divideSound');
	}

	createMap() {
		this.mapa = new GameMap(this.game, 30, 20);
	}

	addPlayerByInfo(playerInfo) {
		let id = playerInfo.id;
		let pos = MapConsts.StartingPositions[id];
		let player = new Player(this.game, playerInfo, pos.x, pos.y);
		let startTile = this.playerTile(player);
		startTile.populate(player, MapConsts.StartHealth);
		this.playerObjects.push(player);
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
		let score = this.mapa.scores();
		if (this.countdown == 0 || Array.from(score.entries()).length == 1) {
			this.finishGame(score);
		}
	}
	
	finishGame(scores) {
		this.game.state.states.EndState.setScore(scores);
		this.game.state.start("EndState");
	}
	
	tileAt(targetTileX, targetTileY) {
		return this.mapa.tileAt(targetTileX, targetTileY);
	}

	playerTile(player) {
		return this.tileAt(player.tilePosX, player.tilePosY);
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
			playDivideSound()
		}
		else {
			let healthToTake = Math.min(targetTile.health, healthToMove);
			srcTile.depopulate(healthToMove);
			targetTile.depopulate(healthToTake);
			let healthToPopulate = healthToMove - healthToTake;
			if (healthToPopulate > 0) {
				targetTile.populate(player, healthToPopulate);
			}
			playAttackSound();
		}
	}	
	
	playDivideSound(){
		this.divideSound.play();
	}
	
	playAttackSound(){
		this.attackSound.play();
	}
}

export default GameState;
