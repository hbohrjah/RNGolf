class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });

        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';
        // load graphics assets
        // load images/tile sprites
        this.load.image('wall', 'img/wall.png')
        //this.load.image('spaceship', './assets/doritoShip.png')
        this.load.image('ball', 'img/ball.png')
        this.load.image('grass', 'img/grass.jpg')
        // load spritesheet
        this.load.spritesheet('dart', 'img/dart-Sheet.png', 
        {
            frameWidth: 64,
            frameHeight: 32
        })

        this.load.spritesheet('mouse', 'img/mouseLeft-Sheet.png', 
        {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet('arrow', 'img/arrowDir-Sheet.png',
        {
            frameWidth: 64,
            frameHeight: 32
        })
    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }
        this.anims.create({
            key: 'dart',
            frames: this.anims.generateFrameNumbers('dart', { start: 0, end: 1}),
            frameRate: 5,
            repeat : 1
        })
        this.anims.create({
            key: 'mouse',
            frames: this.anims.generateFrameNumbers('mouse', { start: 0, end: 1}),
            frameRate: 5,
            repeat : 1
        })
        this.anims.create({
            key: 'arrow',
            frames: this.anims.generateFrameNumbers('arrow', { start: 0, end: 2}),
            frameRate: 5,
            repeat : 1
        })

        // go to Title scene
        this.scene.start('playScene');
    }
}

