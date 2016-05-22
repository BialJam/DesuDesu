/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import MapConsts,{Colors} from 'consts/MapConsts.js';

export class PlayerInfo {
    constructor(padId, id, padMap) {
        this.padId = padId;
        this.id = id;
        this.padMap = padMap;
    }
    get color() {
        return this.colorNum;
    }
    get colorNum() {
        return Colors[this.id].colorNum;
    }
    get colorStr() {
        return Colors[this.id].colorStr;
    }
}

class Player extends Phaser.Group {
    constructor(game, info, tilePosX, tilePosY, callbacks) {
        super(game);
        this.callbacks = callbacks || {};
        if (!this.callbacks.doDivide)
            this.callbacks.doDivide = function (player, targetTileX, tagretTileY) { };
        if (!this.callbacks.context)
            this.callbacks.context = {};
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
            onDown: this.handlePadDown,
            onUp: this.handlePadUp
        });

        this.actionPressed = false;

        this.moveActions = { 'up': this.moveUp, 'down': this.moveDown, 'left': this.moveLeft, 'right': this.moveRight };
        this.divideActions = { 'up': this.divideUp, 'down': this.divideDown, 'left': this.divideLeft, 'right': this.divideRight };
    }

    handlePadDown(btnId) {
        let btnName = this.info.padMap[btnId];
        console.log("button pressed", btnName, "action pressed:" + this.actionPressed);
        if (btnName == 'action')
            this.actionPressed = true;

        if (btnName == 'dash')
            this.dashPressed = true;

        if (this.moveActions[btnName]) {
            if (this.dashPressed) {
                this.divideActions[btnName].call(this);
                this.moveActions[btnName].call(this);
                return;
            }

            if (!this.actionPressed)
                this.moveActions[btnName].call(this);
            else {
                this.divideActions[btnName].call(this);
            }
        }
    }

    handlePadUp(btnId) {
        let btnName = this.info.padMap[btnId];
        if (btnName == 'action')
            this.actionPressed = false;

        if (btnName == 'dash')
            this.dashPressed = false;
    }

    moveUp() {
        console.log("UP!");
        let tween = this.game.add
            .tween(this)
            .to({
                y: ((MapConsts.SizeY + this.tilePosY - 1) % MapConsts.SizeY) * MapConsts.Size
            }, 50, 'Linear', true, 0);
        tween.onComplete.add(() => {
            this.tilePosY = (MapConsts.SizeY + this.tilePosY - 1) % MapConsts.SizeY;
        }, this);
    }

    moveDown() {
        let tween = this.game.add
            .tween(this)
            .to({
                y: ((MapConsts.SizeY + this.tilePosY + 1) % MapConsts.SizeY) * MapConsts.Size
            }, 50, 'Linear', true, 0);
        tween.onComplete.add(() => {
            this.tilePosY = (MapConsts.SizeY + this.tilePosY + 1) % MapConsts.SizeY;
        }, this);
    }

    moveLeft() {
        let tween = this.game.add
            .tween(this)
            .to({
                x: ((MapConsts.SizeX + this.tilePosX - 1) % MapConsts.SizeX) * MapConsts.Size
            }, 50, 'Linear', true, 0);
        tween.onComplete.add(() => {
            this.tilePosX = (MapConsts.SizeX + this.tilePosX - 1) % MapConsts.SizeX;
        }, this);
    }

    moveRight() {
        let tween = this.game.add
            .tween(this)
            .to({
                x: ((MapConsts.SizeX + this.tilePosX + 1) % MapConsts.SizeX) * MapConsts.Size
            }, 50, 'Linear', true, 0);
        tween.onComplete.add(() => {
            this.tilePosX = (MapConsts.SizeX + this.tilePosX + 1) % MapConsts.SizeX;
        }, this);
    }

    divideTo(tilePosX, tilePosY) {
        console.log("divide");
        this.callbacks.doDivide.call(this.callbacks.context, this, tilePosX, tilePosY);
    }

    divideUp() {
        let targetX = this.tilePosX;
        let targetY = this.tilePosY - 1;
        if (targetY >= 0)
            this.divideTo(targetX, targetY);
    }

    divideDown() {
        let targetX = this.tilePosX;
        let targetY = this.tilePosY + 1;
        if (targetY < MapConsts.SizeY)
            this.divideTo(targetX, targetY);
    }

    divideLeft() {
        let targetX = this.tilePosX - 1;
        let targetY = this.tilePosY;
        if (targetX >= 0)
            this.divideTo(targetX, targetY);
    }

    divideRight() {
        let targetX = this.tilePosX + 1;
        let targetY = this.tilePosY;
        if (targetX < MapConsts.SizeX)
            this.divideTo(targetX, targetY);
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