import Helpers from 'includes/Helpers';
import DayCycle from 'objects/DayCycle';

class Main extends Phaser.State {

    create() {
        //game progression variables
        this.game.health = 4;
        this.game.progress = 0;
        this.game.orbCount = 0;
        this.game.checkpoint = 0;
        this.game.debugMode = false;
        this.game.ready = true;
        this.game.end = false;
        this.game.soundsDecoded = false;
        this.game.sounds = new Object();
        this.helpers = new Helpers(this.game);

        //set up world and physics
        //left 1024 offset for objects swap
        this.game.world.setBounds(-1024, 0, this.game.width+1024, this.game.height);
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.restitution = 0.0;
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.gravity.y = 1800;
        this.game.physics.p2.setPostBroadphaseCallback(this.handleContact, this);

        //set up camera and add offset
        this.game.cameraOffset = 1024;
        this.game.camera.width = 0;


        //create game world bitmap and color it
        let bgBitMap = this.game.add.bitmapData(this.game.width, this.game.height);
        bgBitMap.ctx.rect(0, 0, this.game.width, this.game.height);
        bgBitMap.ctx.fillStyle = this.game.lvlFillColor;
        bgBitMap.ctx.fill();
        this.backgroundSprite = this.game.add.sprite(0, 0, bgBitMap);

        //create sun and moon 
        this.moonSprite = this.game.add.sprite(this.game.width - (this.game.width / 4), 150*this.game.lvlId, 'moon');
        this.moonSprite.visible = false;

        //create game backgrounds
        this.backgroundMid = this.game.add.tileSprite(0, 
            this.game.height - this.game.cache.getImage('background-mid-lvl'+this.game.lvlId).height, 
            this.game.width, 
            this.game.cache.getImage('background-mid-lvl'+this.game.lvlId).height, 
            'background-mid-lvl'+this.game.lvlId
        );

        //init day night cycle
        this.dayCycle = new DayCycle(this.game, 0);
        this.dayCycle.initMoon(this.moonSprite);
    }

    update() {

    }

    handleContact(body1, body2) {
        //if any of two bodies does not have oType skip that contact
        if(body1.sprite == null || body2.sprite == null) {
            return false;
        }

        //check if player is one of interacting bodies
        if(body1.sprite.oType == 'Player') {
            var sprite = body2.sprite;
            var player = body1.sprite;
        } else if(body2.sprite.oType == 'Player') {
            var sprite = body1.sprite;
            var player = body2.sprite;
        } else {
            if(body1.sprite.oType == 'Trap') {
                var sprite = body2.sprite;
                var sprite2 = body1.sprite;
            } else {
                var sprite = body1.sprite;
                var sprite2 = body2.sprite;
            }
            var player = null;
        }


        //if player is stunned he does not collide with any object
        //only checkpoint interactions will be handled
        if(sprite.oType!='Checkpoint' && player!=null) {
            if(this.player.stunned || this.player.debug) {
                return false;
            }
        }

        switch(sprite.oType) {
            default:
                return true;
        }
    }

    clearStartMessage() {
        this.game.ready = true;

        this.game.add.tween(this.text)
        .to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.startMessageTween = this.game.add.tween(this.messageBackground)
        .to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    
        this.startMessageTween.onComplete.add(this.startGame, this);
    }

    showLoadingMessage(message, action) {
        let endMessageBitMap = this.game.add.bitmapData(this.game.width, this.game.height);
        endMessageBitMap.ctx.rect(0, 0, this.game.width, this.game.height);
        endMessageBitMap.ctx.fillStyle = '#000000';
        endMessageBitMap.ctx.fill();
        this.messageBackground = this.game.add.sprite(0, 0, endMessageBitMap);
        this.messageBackground.alpha = 0;

        //text
        this.text = this.game.add.text(
            this.game.width/2, this.game.height/2, 
            message
        );
        this.text.anchor.setTo(0.5);
        this.text.font = 'IM Fell DW Pica';
        this.text.fontWeight = 'normal';
        this.text.fontSize = 60;
        this.text.fill = '#FFFFFF'
        this.text.align = 'center';
        this.text.alpha = 0;

        this.game.add.tween(this.text)
        .to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
        this.endMessageTween = this.game.add.tween(this.messageBackground)
        .to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);

        this.endMessageTween.onComplete.add(action, this);
    }

    startGame() {
        this.messageBackground.kill();
        this.text.kill();
    }

    gameOver() {
        this.game.state.clearCurrentState();

        this.game.state.start('GameOver', true, false);
    }

    mainMenu() {
        this.game.state.clearCurrentState();

        this.game.state.start('Menu', true, false);
    }

    gameEnd() {
        this.game.state.clearCurrentState();

        this.game.state.start("Main", true, false); 
    }

    playSounds() {
        this.game.sounds.backgroundRain.play();
        this.game.sounds.backgroundWind.play();
        this.game.soundsDecoded = true;
    }

    clearObjectArray() {
        for (var i = 0; i < this.game.lvlObjects.length; i++) {
            if(this.game.lvlObjects[i].isOut()) {
                this.game.lvlObjects[i].destroy();
                delete this;
                this.game.lvlObjects.splice(i, 1);
            }
        }
    }
}

export default Main;
