/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

import Tile from 'objects/Tile.js';

class Map extends Phaser.Group{
    constructor (game, xSize, ySize) {
        super(game);
        let index = 0;
        this.mapData = Array
            .apply(null, Array(xSize * ySize))
            .map(x => {
                let tile = new Tile(game, index % xSize, Math.floor(index / xSize));
                index++;
                return tile;
            });
            
        this.mapData.forEach(x => this.addChild(x));
    }
}

export default Map;