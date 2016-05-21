import MapConsts from 'consts/MapConsts';

class Tile extends Phaser.Group {
    constructor(game, gridPosX, gridPosY) {
        super(game);
        console.log(game);
        this.sprite = new Phaser.Sprite(
            this.game,
            gridPosX * MapConsts.Size,
            gridPosY * MapConsts.Size,
            'tile');
        this.addChild(this.sprite);
        let healthText = new Phaser.BitmapText(
            this.game,
            4, 8, 'font', '', 16);
        this.sprite.addChild(healthText);
        this.sprite.addChild(healthText);
        this.player = null;
        this.health = 0;
    }
    
    isHabitable() {
        return true;
    }

    isFree() {
        return this.player == null;
    }

    populate(player, health) {
        if (player != this.player) {
            this.health = 0;
        }
        this.player = player;
        this.health += health;
    }
    
    depopulate(health) {
        this.health = Math.max(0, this.health - health);
    }
    
    updateSprite () {
        if (this.player !== null) {
            this.sprite.tint = this.player.color;
            this.healthText.text = this.health; 
        }
    }
}

export default Tile;