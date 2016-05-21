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
        this.player = null;
        this.health = 0;
    }
    
    canLiveOn() {
        return true;
    }

    isFree() {
        return player == null;
    }

    populate(player, health) {
        this.player = player;
        this.health = health;
    }
}

export default Tile;