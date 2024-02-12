// Code Practice: RNGolf
// Name: 
// Date:
/*
<script type="text/javascript" src="./lib/phaser.js"></script>
<script type="text/javascript" src="./src/scenes/Load.js"></script>
<script type="text/javascript" src="./src/scenes/Title.js"></script>
<script type="text/javascript" src="./src/scenes/Play.js"></script>
<script type="text/javascript" src="./src/scenes/GameOver.js"></script>
<script type="text/javascript" src="./src/prefabs/Barrier.js"></script>
<script type="text/javascript" src="./src/main.js"></script>
*/


'use strict'

let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    physics:
    {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: true
        }
    },
    scene: [Load, Play, GameOver ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config

// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
let passed = 0
let inc = false
let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding: {
      top: 5,
      bottom: 5,
    },
    fixedWidth: 100
  }
let RKey, keyLEFT, keyLEFT2, keyRIGHT, keyRIGHT2
const paddleWidth = 32;
const paddleHeight = 190;
/*
const RKey = Phaser.Input.Keyboard.KeyCodes.R
const keyLEFT = Phaser.Input.Keyboard.KeyCodes.LEFT
const keyLEFT2 = Phaser.Input.Keyboard.KeyCodes.A
const keyRIGHT = Phaser.Input.Keyboard.KeyCodes.RIGHT
const keyRIGHT2 = Phaser.Input.Keyboard.KeyCodes.D*/
