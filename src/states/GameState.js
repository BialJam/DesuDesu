import Player from 'objects/Player'

class GameState extends Phaser.State {

    create() {
		this.player1 = new Player();
    }

}

export default GameState;
