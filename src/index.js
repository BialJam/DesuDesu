/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

import GameState from 'states/GameState';
import MenuState from 'states/MenuState';

var _ = require("underscore");

class Game extends Phaser.Game {

	constructor() {
		super(800, 600, Phaser.AUTO, 'content', null);
		this.state.add('MenuState', MenuState, false);
		this.state.add('GameState', GameState, false);
		this.state.start('MenuState');
	}
	
	preload () {
		this.load.spritesheet('cursor', 'static/assets/cursor.png', 16, 16, 4);
	}

}

new Game();
