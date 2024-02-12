class Ball extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture, frame, pointValue)
    {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        //this.ball=this.physics.add.sprite(0,height/3,"ball")
        this.parentScene = scene; 
        //sets collision body to circle
        this.body.setCircle(this.width/2)
        //this.body.setCollideWorldBounds(true)
        this.body.setBounce(1.0)
        this.setGravityY(50);
        this.setDepth(1);             // ensures that paddle z-depth remains above shadow paddles
        this.destroyed = false;       // custom property to track paddle life
        this.scene.input.on('pointerdown', (pointer)=> 
        {
           this.body.setVelocityY(400)
           this.body.setMass(5)
        }, this)
        this.setBlendMode('SCREEN');  // set a WebGL blend mode
        this.moveSpeed = 4
    }

    update()
    {
        if(keyLEFT.isDown|| keyLEFT2.isDown)
        {
            this.setVelocityX(-200)
        }
        else if(keyRIGHT.isDown || keyRIGHT2.isDown)
        {
            this.setVelocityX(200)
        }
        else
        {
            //DAMP FACTOR is 0.9
            this.setVelocityX(this.body.velocity.x * 0.9)
        }

        if(this.y>height)
        {
            this.parentScene.scene.start('gameOverScene')
        }
        /*if (this.ballCollision(this.ball, this.scene.dart)) {
            this.scene.start('gameOverScene')
            //this.shipExplode(this.dart)
        }*/
        
    }
    /*
    ballCollision(this, dart) 
    {
        if (this.x < dart.x + dart.width && 
            this.x + this.width > dart.x && 
            this.y < dart.y + dart.height &&
            this.height + this.y > dart. y) {
                return true;
        } else {
            return false;
        }
    }*/

}