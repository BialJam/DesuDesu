import MapConsts from 'consts/MapConsts';

class Tile extends Phaser.Group {
    constructor (game, gridPosX, gridPosY) {
        super(game);
        console.log(game);
        this.sprite = new Phaser.Sprite(
            this.game,
            gridPosX * MapConsts.Size,
            gridPosY * MapConsts.Size,
            'tile');
        this.addChild(this.sprite);
        this.owner = 'none';
    }
}

export default Tile;