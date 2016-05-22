/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import Grid from 'objects/Grid';
import MapConsts, {configForPlayers} from 'consts/MapConsts';
import GameMap from 'objects/GameMap';
import ScoreTable from 'objects/ScoreTable';
import Player, {PlayerInfo} from 'objects/Player';
import Timer from 'objects/Timer';


class GameState extends Phaser.State {
    create() {
		configForPlayers(this.game.players.length);
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
		this.attackSound = this.game.add.audio('attackSound');
        this.divideSound = this.game.add.audio('divideSound');
	}

	createMap() {
		this.mapa = new GameMap(this.game, MapConsts.SizeX, MapConsts.SizeY);
		this.mapa.scale.set(2,2);
		this.mapa.x += 32;
		this.mapa.y += 54;
	}

	addPlayerByInfo(playerInfo) {
		let id = playerInfo.id;
		let pos = MapConsts.StartingPositions[id];
		let player = new Player(this.game, playerInfo, pos.x, pos.y, { doDivide: (player, targetTileX, targetTileY) => { this.divideInto(player, targetTileX, targetTileY) } });
		let startTile = this.playerTile(player);
		this.mapa.addChild(player);
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
		if (this.countdown && this.countdown % 5 == 0)
			this.mapa.increaseScores();
		let score = this.mapa.scores(this.playerObjects);
		for(let [player, score] of score.entries()) {
			this.scoreTable.changeScore(player, score);
		}
		if (this.countdown == 0 || Array.from(score.entries()).length == 1) {
			this.finishGame(score);
		}
	}
	
	finishGame(scores) {
		for (let player of this.playerObjects) {
			player.unregisterCallbacks();
		}
		this.game.state.states.EndState.setScore(scores);
		this.game.state.start("EndState");
	}

	tileAt(targetTileX, targetTileY) {
		return this.mapa.tileAt(targetTileX, targetTileY);
	}

	playerTile(player) {
		return this.tileAt(player.tilePosX, player.tilePosY);
	}

	divideInto(player, targetTileX, targetTileY) {
		console.log("divide start");
		let srcTile = this.playerTile(player);
		if (srcTile.player !== player)
			return;
		let targetTile = this.tileAt(targetTileX, targetTileY);
		if (!targetTile.isHabitable())
			return;

		let healthToMove = Math.floor(srcTile.health / 2);
		
		if (healthToMove == 0) {
			return;
		}
		
		console.log("divide:", healthToMove);
		
		if (targetTile.isFree() || player.ownsTile(targetTile)) {
			srcTile.depopulate(healthToMove);
			targetTile.populate(player, healthToMove);
			this.playDivideSound();
		}
		else {
			let healthToTake = Math.min(targetTile.health, healthToMove);
			srcTile.depopulate(healthToMove);
			targetTile.depopulate(healthToTake);
			if (healthToTake >= targetTile.health) {
				let healthToPopulate = healthToMove - Math.ceil(healthToTake / 2);
				if (healthToPopulate > 0) {
					targetTile.populate(player, healthToPopulate);
				}
			}
			this.playAttackSound();
		}
	}

	playDivideSound() {
		this.divideSound.play();
	}

	playAttackSound() {
		this.attackSound.play();
	}
}

export default GameState;
