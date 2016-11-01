import Boot from 'states/Boot';
import Preload from 'states/Preload';
import Menu from 'states/Menu';
import Controls from 'states/Controls';
import Main from 'states/Main';
import GameOver from 'states/GameOver';

class Game extends Phaser.Game {

	constructor() {
		super(1920, 1080, Phaser.CANVAS);
	}

}

new Game();