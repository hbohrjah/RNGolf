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

        // add cup
        this.cup = this.physics.add.sprite(width/2, height/10, 'cup')

        //sets collision body to circle
        this.cup.body.setCircle(this.cup.width/4)
        this.cup.body.setOffset(this.cup.width/4)
        this.cup.body.setImmovable(true)
        
        // add ball
        //height - height/10
        this.ball = this.physics.add.sprite(width/2, height/10 - 100, 'ball')

        //sets collision body to circle
        this.ball.body.setCircle(this.ball.width/2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(0.5)
        this.ball.body.setDamping(true).setDrag(0.5)

        // add walls
        let wallA = this.physics.add.sprite(0, height/4, 'wall')
        wallA.name = "wall1"  
        wallA.setX(Phaser.Math.Between(0+ wallA.width/2, width- wallA.width/2))
        wallA.body.setImmovable(true)

        let wallB = this.physics.add.sprite(0, height/2, 'wall')
        wallB.name = "wall2"  
        wallB.setX(Phaser.Math.Between(0+ wallB.width/2, width- wallB.width/2))
        wallB.body.setImmovable(true)

        this.wallC = this.physics.add.sprite(0, height/6, 'wall')
        //this.wallC.setX(Phaser.Math.Between(0+ this.wallC.width/2, width- this.wallC.width/2))
        this.wallC.body.setCollideWorldBounds(true)
        this.wallC.body.setBounce(0.5)
        //this.wallC.body.setImmovable(false)

        //group collider to like sprites
        this.walls = this.add.group([wallA,wallB])

        // add one-way
        this.oneWay = this.physics.add.sprite(width/2, height/4+3, 'oneway')
        this.oneWay.setX(Phaser.Math.Between(0 + this.oneWay.width/2, width - this.oneWay.width/2))
        this.oneWay.body.setImmovable(true)
        this.oneWay.body.checkCollision.down = false

        // add pointer input

        this.input.on('pointerdown', (pointer)=> 
        {
            let shotDir = pointer.y <= this.ball.y? 1: -1
            // Calculate the direction based on pointer's relative x-position
            let directionX = pointer.x - this.ball.x;

            // Normalize the direction
            let length = Math.sqrt(directionX * directionX);
            directionX /= length;

            // Set the velocity based on the direction
            this.ball.body.setVelocityX(directionX * 500); // Adjust the speed as needed
            //this.ball.body.setVelocityX(Phaser.Math.Between(-this.SHOT_VELOCITY_X, this.SHOT_VELOCITY_X))
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX)* shotDir)
        })

        // cup/ball collision

        this.physics.add.collider(this.ball, this.cup, (ball, cup)=> 
        {
            ball.destroy()
            this.new_ball()
        })


        
        // ball/wall collision
        this.physics.add.collider(this.ball, this.walls)
        this.physics.add.collider(this.ball, this.wallC, (ball, wall)=>
        {
            wall.setImmovable(true)
        })

        // ball/one-way collision
        this.physics.add.collider(this.ball, this.oneWay)
    }

    update() {

        //console.log(this.wallC.width/2)
        //console.log(this.wallC.body.setVelocityX(-100)) // Adjust the speed as needed)
        //this.wallC.body.setVelocityX(100); // Adjust the speed as needed

        if(this.wallC.x == this.game.width - this.wallC.width)
        {
            this.wallC.body.setVelocityX(-100); // Adjust the speed as needed
        }
        
        if(this.wallC.x == this.wallC.width/2)
        {
            this.wallC.body.setVelocityX(100); // Adjust the speed as needed
        }
        
        

    }

    new_ball()
    {
  
        this.ball = this.physics.add.sprite(width/2, height - height/10, 'ball')
        //sets collision body to circle
        this.ball.body.setCircle(this.ball.width/2)
        this.ball.body.setCollideWorldBounds(true)
        this.ball.body.setBounce(0.5)
        this.ball.body.setDamping(true).setDrag(0.5)
        // ball/wall collision
        this.physics.add.collider(this.ball, this.walls)

        // ball/one-way collision
        this.physics.add.collider(this.ball, this.oneWay)
    }

}
/*
CODE CHALLENGE
Try to implement at least 3/4 of the following features during the remainder of class (hint: each takes roughly 15 or fewer lines of code to implement):
[#] Add ball reset logic on successful shot
[ ] Improve shot logic by making pointer’s relative x-position shoot the ball in correct x-direction
[#] Make one obstacle move left/right and bounce against screen edges
[ ] Create and display shot counter, score, and successful shot percentage

points/shots
*/