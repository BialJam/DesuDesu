/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import MapConsts from 'consts/MapConsts.js';


class Player extends Phaser.Sprite {
    constructor (game) {
        super(game);
        this.gridPosX = 0;
        this.gridPosY = 0;
    }
    
    create () {
        this.sprite = this.game.add.sprite(
            this.gridPosX,
            this.gridPosY,
            'cursor');
        this.sprite.animations.add('cycle');
        this.sprite.animations.play('cycle', 50);
    }
}

export default Player;