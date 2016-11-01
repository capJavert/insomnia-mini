class Main extends Phaser.State {

    create() {

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
