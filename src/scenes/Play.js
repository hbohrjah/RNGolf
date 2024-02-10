class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // useful variables
        this.SHOT_VELOCITY_X = 200
        this.SHOT_VELOCITY_Y_MIN = 700
        this.SHOT_VELOCITY_Y_MAX = 1100
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)
        this.moveSpeed =2

        this.dart = new Dart(this, w/2, h/2, 'dart', 0, 20).setOrigin(0,0)
        this.dart.body.allowGravity = false;


        // add ball
        this.ball=this.physics.add.sprite(0,height/3,"ball")

        //sets collision body to circle
        this.ball.body.setCircle(this.ball.width/2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(1.0)
        this.ball.setGravityY(50);
        this.ball.setDepth(1);             // ensures that paddle z-depth remains above shadow paddles
        this.ball.destroyed = false;       // custom property to track paddle life
        this.ball.setBlendMode('SCREEN');  // set a WebGL blend mode
    
        // set up barrier group
        this.platGroup = this.physics.add.group({
            defaultKey: 'wall',
            maxSize: 6, // Maximum number of platforms
            runChildUpdate: true // Allow updating individual platforms
        })
        
        this.spawnPlatform()
        this.input.on('pointerdown', (pointer)=> 
        {
           this.ball.body.setVelocityY(400)
           this.ball.body.setMass(5)
           this.platGroup.setVelocityX(-100); // Start moving platforms to the left
        }, this)

        // ball/platform collision
        this.physics.add.collider(this.ball, this.platGroup)

    }

    update() 
    {
        this.dart.play('dart', true)
        this.dart.update() 
        if(this.input.keyboard.addKey(keyLEFT).isDown || this.input.keyboard.addKey(keyLEFT2).isDown)
        {
            this.ball.setVelocityX(-200)
        }
        else if(this.input.keyboard.addKey(keyRIGHT).isDown || this.input.keyboard.addKey(keyRIGHT2).isDown )
        {
            this.ball.setVelocityX(200)
        }
        else
        {
            //DAMP FACTOR is 0.9
            this.ball.setVelocityX(this.ball.body.velocity.x * 0.9)
        }
        this.platGroup.getChildren().forEach(platform => {
            platform.x -= 3; // Adjust speed as needed
    
            // Destroy platforms that are out of sight
            if (platform.x < -platform.width) {
                platform.destroy();
                this.spawnPlatform()
            }
        })

        if (this.ballCollision(this.ball, this.dart)) {
            this.scene.start('gameOverScene')
            //this.shipExplode(this.dart)
        }
        //this.physics.world.collide(this.ball, this.platGroup, this.paddleCollision, null, this);
    }
    
    spawnPlatform() {
        const platform = this.platGroup.create(
            w , // Start from the right
            h, // Bottom of the screen
            'wall'
          )
          platform.body.allowGravity = false;
          platform.setImmovable()
          platform.setOrigin(1, 1); // Set origin to bottom right
          platform.setVelocityX(-100); // Move towards the left
          platform.setDepth(1); // Ensure platforms are above other game elements
        
    }

    ballCollision(ball, dart) 
    {
        if (ball.x < dart.x + dart.width && 
            ball.x + ball.width > dart.x && 
            ball.y < dart.y + dart.height &&
            ball.height + ball.y > dart. y) {
                return true;
        } else {
            return false;
        }
    }
}
