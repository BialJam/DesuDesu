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
    constructor (game, info, tilePosX, tilePosY, callbacks) {
        super(game);
        this.callbacks = callbacks || {};
        this.callbacks.doDivide = function(player, targetTile) {};
        this.info = info;
        this.tilePosX = tilePosX;
        this.tilePosY = tilePosY;
        this.updateSprites();
        this.sprite = new Phaser.Sprite(game, 0, 0, 'cursor');
        this.sprite.tint = info.color;
        this.sprite.animations.add('cycle');
        this.sprite.animations.play('cycle', 8, true);
        this.addChild(this.sprite);
        
        this.pad.addCallbacks(this, {
             onDown : this.handlePadDown,
             onUp : this.handlePadUp
         });
         
         this.actionPressed = false;
         
         this.moveActions = {'up': this.moveUp, 'down': this.moveDown, 'left': this.moveLeft, 'right': this.moveRight};
         
    }
    
    handlePadDown(btnId) {
        let btnName = this.info.padMap[btnId];
        console.log("button pressed");
        console.log(btnName);
        if (btnName == 'action')
            this.actionPressed = true;
            
        if (!this.actionPressed && this.moveActions[btnName])
            this.moveActions[btnName].call(this);
        
    }
    
    handlePadUp(btnId) {
        let btnName = this.info.padMap[btnId];
        if (btnName == 'action')
            this.actionPressed = false;
    }
    
    moveUp() {
        console.log("moved up");
        this.tilePosY = (MapConsts.SizeY + this.tilePosY - 1) % MapConsts.SizeY;
        this.updateSprites();
    }
    
    moveDown() {
        this.tilePosY = (this.tilePosY + 1) % MapConsts.SizeY;
        this.updateSprites();
    }
    
    moveLeft() {
        this.tilePosX = (MapConsts.SizeX + this.tilePosX - 1) % MapConsts.SizeX;
        this.updateSprites();
    }
    
    moveRight() {
        this.tilePosX = (this.tilePosX + 1) % MapConsts.SizeX;
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