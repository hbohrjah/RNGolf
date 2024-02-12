class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, velocity) {
        super(scene, x, y, texture); 
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.parentScene.physics.add.collider(this.parentScene.P1, this)
        this.setOrigin(0, 1)
        this.body.allowGravity = false;
        this.setImmovable();
        this.body.setSize(this.width, this.height)
        this.nScore = 0
        
        this.cursors = this.scene.input.keyboard.createCursorKeys()   
        
        this.scene.input.keyboard.on('keydown', (pointer)=>{
            if (keyLEFT.isDown || keyLEFT2.isDown) {
                
                this.setVelocityX(-200)
                this.update() 
            } else if (keyRIGHT.isDown || keyRIGHT2.isDown) {
                
                this.setVelocityX(-200)
                this.update() 
            }
        })

        this.scene.input.on('pointerdown', (pointer)=> 
        {
            //start the platforms
            //destroy the turtorial
            this.setVelocityX(-200)
            this.update() 
            //this.platGroup.setVelocityX(-100); // Start moving platforms to the left
        }, this)         
        
        this.newPlat = true;                 // custom property to control barrier spawning
    }

    update() {
        // add new barrier when existing barrier hits center X
        /*if(this.newPlat && this.x < centerX) {
            // (recursively) call parent scene method from this context
            this.parentScene.addPlat(this.parent, this.velocity);
            this.newPlat = false;
        }*/
        
        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.x = game.config.width
            this.nScore += 1
            passed += this.nScore
        }
        //this.parentScene.physics.world.collide(this.parentScene.P1, this, this.ballCollision, null, this);
    }


}