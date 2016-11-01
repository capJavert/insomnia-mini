import Rock from 'objects/Rock';
import Orb from 'objects/Orb';
import Fiend from 'objects/Fiend';
import Trap from 'objects/Trap';
import PuzzleObstacle from 'objects/PuzzleObstacle';
import Material from 'objects/Material';
import Helpers from 'includes/Helpers';
import Spikes from 'objects/Spikes';
import Checkpoint from 'objects/Checkpoint';

class LevelData {

    //lvl objects
    //new FlyingFiend(this.game, 0, 0, 0.4, collisionGroups.fiendCollision),
    //new Orb(this.game, 0, 0, 1, collisionGroups.interactionCollision),
    //new Rock(this.game, , , 1, collisionGroups.obstaclesCollision),
    //new Trap(this.game, , , 1, collisionGroups.interactionCollision),
    //new PuzzleObstacle(this.game, , , 1, collisionGroups.interactionCollision),
    //new Spikes(this.game, , , 1, collisionGroups.obstaclesCollision), 
    //new Checkpoint(this.game, , , 1, collisionGroups.interactionCollision), 

    constructor(game){
        this.game = game;

        //init helpers
        this.helpers = new Helpers(this.game);
        this.lvlId = this.game.lvlId;
    }

    fetch(collisionGroups) {
        let data = new Array();

        switch(this.lvlId) {
            case 1: data = this.lvl1Data(collisionGroups);
                break;
            default: 
                this.game.state.start("Menu", true, false);
        }

        return data;
    }

    lvl1Data(collisionGroups) {
        this.game.fog = true;
        this.game.lvlFillColor = '#354a55';

        let lvlObjects = [
            new Orb(this.game, 1000, 60, 1, collisionGroups.interactionCollision),

            new Rock(this.game, 2500, -50, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 2700, 100, 1, collisionGroups.obstaclesCollision),

            new Checkpoint(this.game, 3000, 0, 1, collisionGroups.interactionCollision)

            new Fiend(this.game, 3400, -30, 0.8, collisionGroups.fiendCollision),
        ];

        lvlObjects.push(new Checkpoint(this.game, 18300, 0, 1, collisionGroups.interactionCollision));

        return lvlObjects;
    }
}

export default LevelData;