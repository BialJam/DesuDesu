/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import RainbowText from 'objects/RainbowText';
import Grid from 'objects/Grid';
import Player from 'objects/Player';

class GameState extends Phaser.State {
    create() {
		this.player1 = new Player();
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		//let text = new RainbowText(this.game, center.x, center.y, "- phaser -\nwith a sprinkle of\nES6 dust!");
		game.load.json('level', '../../static/levels/level1.json');
		var levelJson = game.cache.getJSON('level');
		
		var w = levelJson.w;
		var h = levelJson.h;
		var max = Math.max(w, h);
		
		var text = game.add.text(100, 100, "Current Phaser version: " + w + " " + h, { fill: '#ffffff' });	
	}
}

export default GameState;
