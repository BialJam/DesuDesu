/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

import GameState from 'states/GameState';
import MenuState from 'states/MenuState';

class Game extends Phaser.Game {

	constructor() {
		super(800, 600, Phaser.AUTO, 'content', null);
		this.state.add('MenuState', MenuState, false);
		this.state.add('GameState', GameState, false);
		this.state.start('MenuState');
	}

}

new Game();
