class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        //super(scene, game.config.width + paddleWidth, Phaser.Math.Between(paddleHeight/2, game.config.height - paddleHeight/2), 'paddle'); 

        super(scene, w/2, h/2, 'wall'); 
        
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable();                    
        //this.tint = Math.random() * 0xFFFFFF;   // randomize tint
        this.newPlat = true;                 // custom property to control barrier spawning
    }

    update() {
        // add new barrier when existing barrier hits center X
        if(this.newPlat && this.x < centerX) {
            // (recursively) call parent scene method from this context
            this.parentScene.addPlat(this.parent, this.velocity);
            this.newPlat = false;
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}