/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import MapConsts from 'consts/MapConsts.js';

export class PlayerInfo {
    constructor(pad, color, id) {
        this.pad = pad;
        this.color = color;
        this.id = id;
    }
}

class Player extends Phaser.Group {
    constructor (game, info, tilePosX, tilePosY) {
        super(game);
        this.info = info;
        this.position.set(tilePosX * MapConsts.Size, tilePosY * MapConsts.Size);
        this.sprite = new Phaser.Sprite(game, 0, 0, 'cursor');
        this.sprite.tint = info.color;
        this.sprite.animations.add('cycle');
        this.sprite.animations.play('cycle', 8, true);
        
        this.addChild(this.sprite);
    }
}

export default Player;