/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import Grid from 'objects/Grid';
import Player from 'objects/Player';

class GameState extends Phaser.State {
    preload(){
		this.game.load.tilemap('myTileMap', '/assets/level11.json', null, Phaser.Tilemap.TILED_JSON);		
		this.game.load.image('myTiles', '/assets/tileset.png');
	}
	
	create() {
		this.player1 = new Player();
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		
		map = this.game.add.tilemap('myTileMap');
        map.addTilesetImage('tiles', 'myTiles');
        layer = map.createLayer('layer');
        layer.resizeWorld();
        layer.wrap = true;
	}
}

export default GameState;
