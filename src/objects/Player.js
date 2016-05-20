/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

import MapConsts from 'consts/MapConsts.js'

class Player extends Phaser.Sprite {
    constructor () {
        super();
        this.gridPosX = 0;
        this.gridPosY = 0;
    }
    
    create () {
        
    }
}

export default Player