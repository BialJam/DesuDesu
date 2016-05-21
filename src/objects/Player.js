/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import MapConsts from 'consts/MapConsts.js';


class Player extends Phaser.Group {
    constructor (game, color, pad, posx, posy) {
        this.game = game;
        this.gridPosX = posx;
        this.gridPosY = posy;
        this.sprite = this.game.add.sprite(
            this.gridPosX * MapConsts.Size,
            this.gridPosY * MapConsts.Size,
            'cursor');
        this.sprite.tint = color;
        this.sprite.animations.add('cycle');
        this.sprite.animations.play('cycle', 8, true);
        
        this.pad = pad;
        
        this.addChild(this.sprite);
    }
}

export default Player;