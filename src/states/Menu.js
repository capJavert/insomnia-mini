import MenuButton from 'objects/MenuButton';

class GameTitle extends Phaser.State {

	create() {
		//pause all sounds
		this.game.sound.pauseAll();

		//logo
		this.logo = this.game.add.image(this.game.width/2, 140, 'logo');
		this.logo.scale.setTo(0.5, 0.5);
		this.logo.anchor.setTo(0.5, 0); 

		//buttons
	    this.play = new MenuButton(this.game, this.game.width/2, this.logo.position.y+this.logo.height+100, "Play", this.startGame);
	}

	startGame() {
		this.game.lvlId = 1;

		this.game.state.start("Main");
	}

	Controls() {
		this.game.state.start("Controls");
	}
}

export default GameTitle;
