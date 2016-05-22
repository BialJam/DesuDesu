/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import MapConsts from 'consts/MapConsts.js';

export class PlayerInfo {
    constructor(pad, color, id, padMapping) {
        this.pad = pad;
        this.color = color;
        this.id = id;
        this.padMapping = padMapping; // map pad key => button type string
    }
    get colorNum () {
        return MapConsts.StartingPositions[this.id].colorNum;
    }
    get colorStr () {
        return MapConsts.StartingPositions[this.id].colorStr;
    }
}

class Player extends Phaser.Group {
    constructor (game, info, tilePosX, tilePosY) {
        super(game);
        this.info = info;
        this.tilePosX = tilePosX;
        this.tilePosY = tilePosY;
        this.updateSprites();
        this.sprite = new Phaser.Sprite(game, 0, 0, 'cursor');
        this.sprite.tint = info.color;
        this.sprite.animations.add('cycle');
        this.sprite.animations.play('cycle', 8, true);
        this.addChild(this.sprite);
        
        // this.info.pad.addCallback(this, {
        //     onDown : x => this.keys['action'] = true;
        // })
    }
    
    moveUp() {
        this.tilePosY -= 1;
        this.updateSprites();
    }
    
    moveDown() {
        this.tilePosY += 1;
        this.updateSprites();
    }
    
    moveLeft() {
        this.tilePosX -= 1;
        this.updateSprites();
    }
    
    moveRight() {
        this.tilePosX += 1;
        this.updateSprites();
    }
    
    ownsTile(tile) {
        return tile.player === this;
    }
    
    updateSprites() {
        this.position.set(this.tilePosX * MapConsts.Size, this.tilePosY * MapConsts.Size);
    }
    
    update() {
    }
}

export default Player;