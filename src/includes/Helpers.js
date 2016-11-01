import Orb from 'objects/Orb';

class Helpers {

	constructor(game){
		this.game = game;
	}

	//generates Orb in linear interval
	linearOrbGenerator(collisionGroup, lvlArray, orbNumber, orbStartPosition, orbPositionY, interval) {
		var orbSpawnPosition = orbStartPosition;
		var loopLimit = lvlArray.length+orbNumber;

		for (var i = lvlArray.length; i < loopLimit; i++) {
			lvlArray.push(new Orb(this.game, orbSpawnPosition, orbPositionY, 1, collisionGroup));
			orbSpawnPosition+=interval;
		};

		return lvlArray;
	}
}

export default Helpers;