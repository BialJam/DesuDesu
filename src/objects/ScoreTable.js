/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />
import MapConsts, {Colors} from 'consts/MapConsts';

class ScoreTable extends Phaser.Sprite {
    constructor(game, PosX, PosY, key) {
        super(game);
        this.sprite = new Phaser.Sprite(game, PosX, PosY, key);
        game.add.existing(this);

        let scores = [];
        scores[0] = this.game.add.bitmapText(262 - 24 - 64 - 32, 12, 'font', '0', 24);
        scores[1] = this.game.add.bitmapText(390 - 24 - 64, 12, 'font', '0', 24);
        scores[2] = this.game.add.bitmapText(518 - 24 + 64, 12, 'font', '0', 24);
        scores[3] = this.game.add.bitmapText(646 - 24 + 64 + 32, 12, 'font', '0', 24);

        for (let score of scores) {
            this.addChild(score);
        }

        let pads = [];
        pads.push(new Phaser.Sprite(game, 262 + 24 - 64 - 32, 6, 'pad'));
        pads.push(new Phaser.Sprite(game, 390 + 24 - 64, 6, 'pad'));
        pads.push(new Phaser.Sprite(game, 518 + 24 + 64, 6, 'pad'));
        pads.push(new Phaser.Sprite(game, 646 + 24 + 64 + 32, 6, 'pad'));

        let idx = 0;
        for (let pad of pads) {
            this.addChild(pad);
            pad.tint = Colors[idx].colorNum;
            idx++;
        }
    }

    changeScore(player, score) {
        let id = player.info.id;
        let p1Score = this.getChildAt(id);
        p1Score.text = score;
        this.removeChildAt(id);
        this.addChildAt(p1Score, id);
    }
}

export default ScoreTable;