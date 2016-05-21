/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

import Tile from 'objects/Tile.js';

class GameMap extends Phaser.Group {
    constructor(game, xSize, ySize) {
        super(game);
        let index = 0;
        this.mapData = Array
            .apply(null, Array(xSize * ySize))
            .map(x => {
                let tile = new Tile(game, index % xSize, Math.floor(index / xSize));
                index++;
                return tile;
            });
        console.log(this.mapData);

        this.mapData.forEach(x => { this.addChild(x); });
    }

    tileAt(targetTileX, targetTileY) {
        return this.mapData[targetTileY * xSize + targetTileY];
    }

    scores() {
        let playerToScore = new Map();
        for (let i = 0; i < this.mapData.length; ++i) {
            let tile = this.mapData[i];
            if (!tile.isFree()) {
                let player = tile.player;
                let newScore = playerToScore.get(player) || 0;
                playerToScore.set(player, newScore);
            }
        }
        return playerToScore;
    }
}

export default GameMap;