/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import MapConsts from 'consts/MapConsts.js';

export class PlayerInfo {
    constructor(padId, id, padMap, axisMap) {
        this.padId = padId;
        this.id = id;
        this.padMap = padMap;
        this.padAxisMap = axisMap; // map pad key => button type string
    }
    get color() {
        return this.colorNum;
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
        
        // this.pad.addCallback(this, {
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
    
    get pad() {
        return this.game.input.gamepad[this.info.padId];
    }
}

export default Player;