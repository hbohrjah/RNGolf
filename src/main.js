// Code Practice: RNGolf
// Name: 
// Date:

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics:
    {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true
        }
    },
    scene: [ Play ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config