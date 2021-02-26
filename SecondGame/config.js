var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x000099,
    scene: [Main],
    title: "Journey",
    version: "0.0.1",
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
};

let game = new Phaser.Game(config);
let player;
let scoreText;
let cursors;
let keyA;
let keyS;
let keyD;
let keyW;
let score;