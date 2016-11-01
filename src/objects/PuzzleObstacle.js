import Sprite from 'objects/Sprite';
import Material from 'objects/Material';

class PuzzleObstacle extends Sprite {

	constructor(game, x, y, scale, collisionGroup){
		super(game, x, y, scale, collisionGroup);
		this.game = game;
		this.oType = 'PuzzleObstacle';
		this.x = x;
		this.y = this.game.height-y;
		this.scale = scale;
		this.visible = false;
		this.collisionGroup = collisionGroup;
	}

	render() {
		this.sprite = this.game.add.sprite(this.x, this.y, 'puzzle-obstacle');
		this.sprite.position.y -= (this.sprite.height/2);
		this.setScale(this.scale);
		this.game.physics.p2.enable(this.sprite, this.game.debugMode);
		this.sprite.oType = this.oType; //for check inside collision callback
	    this.sprite.body.kinematic = true;
        this.sprite.body.collideWorldBounds = true;
        //this.sprite.body.gravityScale = 0;
        this.sprite.body.setCollisionGroup(this.collisionGroup);

		this.visible = true;
		this.sprite.isFollowingPlayer = false;

		//set material params
		this.material = new Material(this.game, 'puzzle-obstacle', this.sprite.body);
	}

	update(playerObject) {

	}
}

export default PuzzleObstacle;