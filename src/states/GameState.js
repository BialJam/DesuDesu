/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import Grid from 'objects/Grid';
import Player from 'objects/Player';

class GameState extends Phaser.State {
<<<<<<< HEAD
    preload(){
		this.game.load.tilemap('myTileMap', '/assets/level11.json', null, Phaser.Tilemap.TILED_JSON);		
		this.game.load.image('myTiles', '/assets/tileset.png');
	}
	
	create() {
		this.player1 = new Player();
=======
    create() {
		let player1 = new Player(this.game);
		player1.create();
>>>>>>> edadfc8e24827d7908dda359c94c68751b600426
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		
		map = this.game.add.tilemap('myTileMap');
        map.addTilesetImage('tiles', 'myTiles');
        layer = map.createLayer('layer');
        layer.resizeWorld();
        layer.wrap = true;
	}
	
	preload () {
		this.load.spritesheet('cursor', 'assets/cursor.png', 16, 16, 4);
	}
}

export default GameState;
