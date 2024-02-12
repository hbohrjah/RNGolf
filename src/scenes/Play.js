class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        // useful variables
        this.PLATFORM_SPACE = w/4
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyLEFT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyRIGHT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        RKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    }

    create() {
        // add background grass
        //this.grass = this.add.image(0, 0, 'grass').setOrigin(0)
        //this.background = this.add.tileSprite(0, 0, w, h,  'city').setOrigin(0, 0)
        
        this. travel = false
        


        this.tutorial = this.add.sprite(128, h/2 + 90, 'mouse').setScale(2)
        this.tutorial2 = this.add.sprite(202, h/2 + 90, 'arrow').setScale(1.25)

        this.tutorial.play('mouse', true)
        this.tutorial2.play('arrow', true)
        
        this.dart = new Dart(this, w, h/2, 'dart', 0, 20).setOrigin(0,0)

        // add ball
        this.P1 = new Ball(this, 32, h/3, 'ball')
        
        this.platN = new Platform (this, 0, h, 'wall')
        this.platN2 = new Platform (this, this.PLATFORM_SPACE, h, 'wall')
        this.platN3 = new Platform (this, 2*this.PLATFORM_SPACE, h, 'wall')
        this.platN4 = new Platform (this, 3*this.PLATFORM_SPACE, h, 'wall')
        //this.platN5 = new Platform (this, 4*this.PLATFORM_SPACE, h, 'wall')
        this.highUI = this.add.text(game.config.width/2- 40, h/15, passed, scoreConfig)
        //this.elapsed = this.clock.getRemainingSeconds()
        this.timeBar = this.add.text(game.config.width/2+180, borderUISize + borderPadding*2, Math.floor(this.elapsed), scoreConfig)
        

        // Destroy tutorial on input
        this.input.keyboard.on('keydown', (pointer)=>{
            if (keyLEFT.isDown || keyLEFT2.isDown) {
                this.begin_game()
                
            } else if (keyRIGHT.isDown || keyRIGHT2.isDown) {
                this.begin_game()
            }
        })
        this.input.on('pointerdown', (pointer)=> 
        {
            this.begin_game()
        }, this) 
    }

    update() 
    {
        
        /*if(this.travel == true)
        {
            this.background.tilePositionX += 4
        }*/
        this.restart()
        this.dart.update() 
        this.P1.update()
        
        // Update the elapsed time
        elapsedTime += this.time.delta; // Increment elapsed time by delta time (time since last frame)
        
        // Update the timer text
        this.timerText.setText('Time: ' + Math.floor(elapsedTime / 1000)); // Convert milliseconds to seconds for display
        console.log(passed)
        

    }

    restart()
    {
        if (Phaser.Input.Keyboard.JustDown( this.input.keyboard.addKey(RKey))) {
            // start next scene
            passed  = 0
            this.scene.stop('playScene');
            this.scene.start('playScene');
        }
    }

    begin_game()
    {
        this.tutorial.destroy()
        this.tutorial2.destroy()
        this.travel = true
        return
    }

}
