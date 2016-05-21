/// <reference path="../../node_modules/phaser/typescript/phaser.d.ts" />

class EndState extends Phaser.State {
    create() {
        this.game.add.tileSprite(0, 0, 960, 640, 'background-menu');
        let center = { x: this.game.world.centerX, y: this.game.world.centerY };

        winnerInfo = new Phaser.Text(this.game, center.x - 150, center.y - 150, 'Zwyciężył: ' + this.game.winner + '!', { font: "48px Arial", fill: "#ffffff" });
        this.game.add.existing(winnerInfo);
    }
}

export default EndState;
