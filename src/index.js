/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

import GameState from 'states/GameState';
import MenuState from 'states/MenuState';
import LoadingScreen from 'states/LoadingScreen';

var _ = require("underscore");

class Game extends Phaser.Game {

	constructor() {
		super(960, 640, Phaser.AUTO, 'content', null);
		this.state.add('LoadingScreen', LoadingScreen, false);
		this.state.add('MenuState', MenuState, false);
		this.state.add('GameState', GameState, false);
		this.state.add('EndState', GameState, false);
		this.players = [];
		this.state.start('LoadingScreen');
	}

	create() {
		console.log("game create");
		this.stage.backgroundColor = "#ff00ff";
	}
}

new Game();
