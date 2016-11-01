class Boot extends Phaser.State {

	preload() {

	}

	create() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.state.start("Preload");
		this.game.lastLvlId = 1;
	}

}

export default Boot;