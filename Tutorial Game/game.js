var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: [Menu, Main, GameOver, Settings, Pause],
    title: "Mygame",
    version: "0.0.1",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: false
        }
    },
};

var game = new Phaser.Game(config);
let platforms;
let border;
let moneyblocks;
let freezeblocks;
let freezeballs;
let player;
let coins;
let bombs;
let cursors;
let score = 0;
let level = 0;
let scoreText;
let levelText;
let gameOver = false;
let keyA;
let keyS;
let keyD;
let keyW;
let keyR;
let keyE;
let keyX;
let keyM;
let title;
let text;
let text1;
let text2;
let text3;
let camera = this.camera;
let bg1;
let alreadyhit = false;

function collectCoin(player, coin) {
    coin.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (coins.countActive(true) === 0) {
        coins.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
}

function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;

    player.disableBody(true, true);

    this.registry.destroy();
    this.events.off();

    this.scene.start('GameOver', { level: level })

    score = 0;
    // level = 0;
}

function hitMoneyBlock(player, moneyblock) {
    score = score + 10; 
    moneyblock.disableBody(true, true);
}

function hitMoneyBlockCoin(coin, moneyblock) {
    coin.disableBody(true, true);
}

function hitfreezeblock(player, freezeblock) {
    freezeblock.disableBody(true, true);
}

function freezebomb(freezeball, bombs) {
    bombs.scrollFactorX = 0;
    bombs.scrollFactorY = 0;
}