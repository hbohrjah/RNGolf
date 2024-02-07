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

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg')
        this.load.image('ball', 'ball.png')
        this.load.image('wall', 'wall.png')
        this.load.image('oneway', 'one_way_wall.png')
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)

        this.moveSpeed =2
        let square = this.physics.add.sprite(0, height/4, 'wall'); // Adjust the position as needed
        square.setImmovable(true); // Make the square immovable
        square.body.setCollideWorldBounds(true)

        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)



        // add ball
        //height - height/10
        //this.ball = this.physics.add.sprite(width/2, height/10 - 100, 'ball')
        this.ball=this.physics.add.sprite(this.sys.game.config.width/2,height/2,"ball")

        //sets collision body to circle
        this.ball.body.setCircle(this.ball.width/2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(1.0)
        this.ball.body.setMass(5)
        //this.ball.body.setDamping(true).setDrag(0.5)
        

        // add pointer input
        this.ball.setGravityY(50);
        this.input.on('pointerdown', (pointer)=> 
        {
            //let shotDir = pointer.y <= this.ball.y? 1: -1
            // Calculate the direction based on pointer's relative x-position
            //let directionX = pointer.x - this.ball.x;

            // Normalize the direction
            //let length = Math.sqrt(directionX * directionX);
            //directionX /= length;

            // Set the velocity based on the direction
            //this.ball.body.setVelocityX(directionX * 500); // Adjust the speed as needed
            //this.ball.body.setVelocityX(Phaser.Math.Between(-this.SHOT_VELOCITY_X, this.SHOT_VELOCITY_X))
           this.ball.body.setVelocityY(300)
        })

        // cup/ball collision
        this.physics.add.collider(this.ball, square)
        // ball/wall collision
        
        // ball/one-way collision
    }

    update() 
    {
        if(this.keyLEFT.isDown )
        {
            //&& this.ball.x >= this.config.width
            //this.ball.setAngularVelocity(-200);
            //this.ball.x -= this.moveSpeed
            this.ball.setVelocityX(-200)
        }
        else if(this.keyRIGHT.isDown )
        {
            //&& this.ball.x <= this.config.width
            //this.ball.setAngularVelocity(200);
            //this.ball.x += this.moveSpeed
            this.ball.setVelocityX(200)
        }
        else
        {
            //DAMP FACTOR is 0.9
            this.ball.setVelocityX(this.ball.body.velocity.x * 0.9)
        }

        
        // add new barrier when existing barrier hits center X
        if(this.newBarrier && this.x < centerX) {
            // (recursively) call parent scene method from this context
            this.parentScene.addBarrier(this.parent, this.velocity);
            this.newBarrier = false;
            this.parentScene.addBarrier(this.parent, this.velocity)
            this.newBarrier = false
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
            this.destroy()
        }
    }
}
