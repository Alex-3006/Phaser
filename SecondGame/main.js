class Main extends Phaser.Scene {
    constructor() {
        super("main");
    }

    preload() {
        this.load.image('player', 'assets/person.png');
    }

    create() {
        player = this.physics.add.sprite(300, 515, 'player');

        player.setBounce(0.2);

        player.body.setGravityY(300)

        player.setCollideWorldBounds(true);

        scoreText = this.add.text(650, 16, 'Score: 0', { fontSize: '32px', fill: '#FF0000', fontFamily: 'sans serif'});
        scoreText.scrollFactorX = 0;
        scoreText.scrollFactorY = 0;

        cursors = this.input.keyboard.createCursorKeys();

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        // this.cameras.main.startFollow(player);
        // this.cameras.main.followOffset.set(0, 250);
    }

    update() {
        if (cursors.left.isDown || keyA.isDown) {
            player.setVelocityX(-200);
        }
        else if (cursors.right.isDown || keyD.isDown) {
            player.setVelocityX(200);
        }
        else {
            player.setVelocityX(0);
        }

        if ((cursors.up.isDown && player.body.touching.down) || (keyW.isDown && player.body.touching.down)) {
            player.setVelocityY(-450);
        }

        if (score === 200) {
            scoreText.setText('You won');
        }
    }
}