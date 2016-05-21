/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
"use strict";

class LoadingScreen extends Phaser.State {
    preload() {
        this.barLoaded = false;

        this.load.image('loading-logo', 'assets/loading/load-logo.png');
        this.load.image('loading-bar', 'assets/loading/bar.png');
        this.load.addSyncPoint('image', 'loading-bar');
        this.load.onFileComplete.add(this.afterLoaded, this);
        //this.load.spritesheet('startBtn-menu', 'assets/button.png', 120, 80);
        this.load.image('background-menu', 'assets/tile.png');
        // prefix loaded sprites with names of state/object
        this.load.image('loading-2', 'assets/loading/2.png');
        
        this.game.load.tilemap('myTileMap', 'assets/level11.json', null, Phaser.Tilemap.TILED_JSON);		
		this.game.load.image('tiles', 'assets/tileset.png');
        this.game.load.image('tile', 'assets/tile.png');
		
		this.load.spritesheet('cursor', 'assets/cursor.png', 32, 32, 4);	
        
        this.load.bitmapFont('font', 'assets/04B_03___0.png', 'assets/04B_03__.xml');
        
        this.game.load.audio('themeAudio', 'assets/audio/themeAudio.mp3');        
        
        this.game.load.spritesheet('colorButtons', 'assets/colorButtonSpritesheet.png', 64, 64); 
        this.game.load.spritesheet('startGameSpritesheet', 'assets/startGameSpritesheet.png', 248, 64); 
}

    afterLoaded() {
        var fns = {
            'loading-logo': this.afterLogoLoaded,
            'loading-bar': this.afterBarLoaded
        };
        if (fns[arguments[1]])
            fns[arguments[1]].call(this);
    }
    
    afterLogoLoaded() {
        this.logo = this.game.add.image(this.game.width / 2, this.game.height / 2, 'loading-logo');
        this.logo.anchor.setTo(0.5);
    }

    afterBarLoaded() {
        this.origWidth = this.cache.getImage('loading-bar').width;
        this.bar = this.game.add.image(this.game.width / 2 - this.origWidth / 2, this.game.height / 2 + this.logo.height, 'loading-bar');
       
        this.cropRect = new Phaser.Rectangle(0, 0, 0, this.bar.height);
        this.bar.crop(this.cropRect);
        this.barLoaded = true;
    }

    loadUpdate() {
        if (this.barLoaded) {
            this.barUpdate(this.load.progress);
        }
    }
    
    barUpdate(pct) {
        this.cropRect.width = pct * this.origWidth / 100;
        this.bar.crop(this.cropRect);
    }

    create() {
        var themeAudio = this.game.add.audio("themeAudio");
        themeAudio.loopFull(0.6);
        this.barUpdate(100);
        this.state.start('MenuState');
    }
};

export default LoadingScreen;