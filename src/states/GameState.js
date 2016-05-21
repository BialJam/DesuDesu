/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import Grid from 'objects/Grid';
import Player from 'objects/Player';

class GameState extends Phaser.State {
	create() {
		let player1 = new Player(this.game);
		player1.create();
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		
		var map = this.game.add.tilemap('myTileMap');
        map.addTilesetImage('tileset', 'tiles');
        var layer = map.createLayer('tiles');
        layer.resizeWorld();
        layer.wrap = true;
	}
}

export default GameState;
