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
            new Rock(this.game, 2500, -50, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 2700, 100, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 4700, 0, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 4900, -40, 1, collisionGroups.obstaclesCollision),

            new Checkpoint(this.game, 5400, 0, 1, collisionGroups.interactionCollision),
            new Rock(this.game, 5900, 0, 1, collisionGroups.obstaclesCollision),
            new Orb(this.game, 5900, 320, 1, collisionGroups.interactionCollision),
            new Spikes(this.game, 6300, 0, 1, collisionGroups.obstaclesCollision), 
            new Rock(this.game, 6700, 0, 1, collisionGroups.obstaclesCollision),
            new Orb(this.game, 6700, 320, 1, collisionGroups.interactionCollision),
            new Spikes(this.game, 7100, 0, 1, collisionGroups.obstaclesCollision), 
            new Rock(this.game, 7500, 0, 1, collisionGroups.obstaclesCollision),
            new Orb(this.game, 7500, 320, 1, collisionGroups.interactionCollision),

            new Rock(this.game, 8200, 100, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 8300, 160, 1, collisionGroups.obstaclesCollision),  
            new Rock(this.game, 8400, 220, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 8400, 100, 1, collisionGroups.obstaclesCollision),

            new Checkpoint(this.game, 9300, 0, 1, collisionGroups.interactionCollision, "Hold <A> to Move blocks"),
            new PuzzleObstacle(this.game, 10200, -400, 1, collisionGroups.puzzleCollision),
            new PuzzleObstacle(this.game, 10700, -200, 1, collisionGroups.puzzleCollision),
            new PuzzleObstacle(this.game, 11200, -300, 1, collisionGroups.puzzleCollision),

            new Rock(this.game, 12200, 500, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 12200, 250, 1, collisionGroups.obstaclesCollision),
            new Rock(this.game, 12200, 100, 1, collisionGroups.obstaclesCollision),
            new Fiend(this.game, 12700, -30, 0.8, collisionGroups.fiendCollision),

            new Checkpoint(this.game, 14000, 0, 1, collisionGroups.interactionCollision, "Hold <A> and Move"),
            new Trap(this.game, 14000, 0, 1, collisionGroups.interactionCollision),
            new Fiend(this.game, 16000, -50, 0.8, collisionGroups.fiendCollision),
        ];

        //apply generators
        lvlObjects = this.helpers.linearOrbGenerator(collisionGroups.interactionCollision, lvlObjects, 4, 960, 70, 360);
        lvlObjects = this.helpers.linearOrbGenerator(collisionGroups.interactionCollision, lvlObjects, 3, 3160, 70, 360);
        lvlObjects = this.helpers.linearOrbGenerator(collisionGroups.interactionCollision, lvlObjects, 5, 16500, 70, 360);

        lvlObjects.push(new Checkpoint(this.game, 18300, 0, 1, collisionGroups.interactionCollision));

        return lvlObjects;
    }
}

export default LevelData;