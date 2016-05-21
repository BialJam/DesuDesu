/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import Grid from 'objects/Grid';
import Player from 'objects/Player';

class GameState extends Phaser.State {
	preload () {
		this.game.load.tilemap('myTileMap', 'assets/level11.json', null, Phaser.Tilemap.TILED_JSON);		
		this.game.load.image('tiles', 'assets/tileset.png');
		
		this.load.spritesheet('cursor', 'assets/cursor.png', 16, 16, 4);		
	}
	
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
