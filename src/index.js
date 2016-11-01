import Boot from 'states/Boot';
import Preload from 'states/Preload';
import Menu from 'states/Menu';
import Controls from 'states/Controls';
import Main from 'states/Main';
import GameOver from 'states/GameOver';

class Game extends Phaser.Game {

	constructor() {
		super(1920, 1080, Phaser.CANVAS);

		this.state.add('Boot', Boot, false);
		this.state.add('Preload', Preload, false);
		this.state.add('Menu', Menu, false);
		this.state.add('Controls', Controls, false);
		this.state.add('Main', Main, false);
		this.state.add('GameOver', GameOver, false);

		this.state.start('Boot');
	}

}

new Game();