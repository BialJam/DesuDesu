/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import Grid from 'objects/Grid';
import MapConsts from 'consts/MapConsts';
import Map from 'objects/Map';
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
		this.mapa = new Map(this.game, 10, 10);
	}

	addPlayerByInfo(playerInfo) {
		let id = playerInfo.id;
		let pos = MapConsts.StartingPositions[id];
		console.log(this.game);
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
}

export default GameState;
