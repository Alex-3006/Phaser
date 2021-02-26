class Main extends Phaser.Scene {
    constructor() {
        super("main");
    }

    preload() {
        this.load.image('player', 'assets/person.png');
        this.load.image('block_1', 'assets/envoierment/Block_1.png');
        this.load.image('block_2', 'assets/envoierment/Block_2.png');
        this.load.image('block_3', 'assets/envoierment/Block_3.png');
        this.load.image('dirt_1', 'assets/envoierment/Dirt_1.png');
        this.load.image('dirt_2', 'assets/envoierment/Dirt_2.png');
        this.load.image('dirt_3', 'assets/envoierment/Dirt_3.png');
    }

    create() {
        player = this.physics.add.sprite(300, 515, 'player');

        player.setBounce(0.2);

        player.body.setGravityY(300)

        player.setCollideWorldBounds(true);

        scoreText = this.add.text(650, 16, 'Score: 0', { fontSize: '32px', fill: '#FF0000', fontFamily: 'sans serif' });
        scoreText.scrollFactorX = 0;
        scoreText.scrollFactorY = 0;

        while (a != 1000) {
            b = Math.round(Math.random() * 3)
            // var sprite = scene.add.sprite(x, y, key, frame);
            if (b === 0) {
                this.add.sprite(200, 200, 'block_1');
            }
            else if (b === 1) {
                this.add.sprite(200, 200, 'block_2');
            }
            else if (b === 2) {
                this.add.sprite(200, 200, 'block_2');
            }

            b = Math.round(Math.random() * 3)
            if (b === 0) {
                this.add.sprite(200, 200, 'dirt_1');
            }
            else if (b === 1) {

            }
            else if (b === 2) {

            }
            a++;
        }

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

        if ((cursors.up.isDown && player.body.onFloor()) || (keyW.isDown && player.body.onFloor())) {
            player.setVelocityY(-175);
        }

        if (score === 200) {
            scoreText.setText('You won');
        }
    }
}