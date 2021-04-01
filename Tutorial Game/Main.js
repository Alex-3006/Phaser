class Main extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.spritesheet('ground', 'assets/platform.png',
            { frameWidth: 400, frameHeight: 30 });
        this.load.image('coin', 'assets/coin.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('moneyblock', 'assets/moneyBlock.png');
        this.load.image('freezeblock', 'assets/freezeBlock.png');
        this.load.image('freezeball', 'assets/freezeBall.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create() {
        this.bg1 = this.add.tileSprite(0, 0, 800, 600, "sky");

        this.bg1.setOrigin(0, 0);

        this.bg1.setScrollFactor(0);

        border = this.physics.add.staticGroup();

        border.create(-1000, 350, 'sky');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(9999, 1).refreshBody();

        platforms.create(600, 470, 'ground').setScale(0.3, 1).refreshBody();
        platforms.create(450, 380, 'ground').setScale(0.3, 1).refreshBody();
        platforms.create(300, 470, 'ground').setScale(0.3, 1).refreshBody();

        moneyblocks = this.physics.add.staticGroup();

        moneyblocks.create(600, 470, 'moneyblock').setScale(2.3, 2.3).refreshBody();

        moneyblocks.create(300, 470, 'moneyblock').setScale(2.3, 2.3).refreshBody();

        freezeblocks = this.physics.add.staticGroup();

        freezeblocks.create(450, 380, 'freezeblock').setScale(2.3, 2.3).refreshBody();

        freezeballs = this.physics.add.staticGroup();

        player = this.physics.add.sprite(300, 515, 'dude');

        player.setBounce(0.2);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        player.body.setGravityY(300)

        this.physics.add.collider(player, platforms);

        this.physics.add.collider(player, border);

        coins = this.physics.add.group({
            key: 'coin',
            repeat: 19,
            setXY: { x: 12, y: 0, stepX: 40 }
        });

        coins.children.iterate(function (child) {

            child.setBounceY(0.2);

        });

        this.physics.add.collider(coins, platforms);

        this.physics.add.overlap(player, coins, collectCoin, null, this);

        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        scoreText.scrollFactorX = 0;
        scoreText.scrollFactorY = 0;

        levelText = this.add.text(600, 16, 'Level: 0', { fontSize: '32px', fill: '#000' });
        levelText.scrollFactorX = 0;
        levelText.scrollFactorY = 0;

        bombs = this.physics.add.group();

        this.physics.add.collider(bombs, platforms);

        this.physics.add.collider(player, moneyblocks, hitMoneyBlock);

        this.physics.add.collider(coins, moneyblocks, hitMoneyBlockCoin);

        this.physics.add.collider(player, freezeblocks, hitfreezeblock);

        this.physics.add.collider(bombs, freezeballs, freezebomb);

        this.physics.add.collider(player, bombs, hitBomb, null, this);

        this.physics.add.collider(bombs, bombs);

        this.physics.add.collider(bombs, border);

        cursors = this.input.keyboard.createCursorKeys();

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)

        this.cameras.main.startFollow(player);

        this.cameras.main.followOffset.set(0, 250);
    }

    update() {
        if (cursors.left.isDown || keyA.isDown) {
            player.setVelocityX(-200);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown || keyD.isDown) {
            player.setVelocityX(200);

            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if ((cursors.up.isDown && player.body.touching.down) || (keyW.isDown && player.body.touching.down)) {
            player.setVelocityY(-450);
        }

        if (score === 200) {
            score = 0;
            level++;
            levelText.setText('Level: ' + level);
            scoreText.setText('Score: 0');
        }

        if (keyR.isDown) {
            freezeballs.create(player.x, player.y, 'freezeball').setScale(0.3, 0.3).refreshBody();
        }

        // if (keyE.isDown){
        //     this.scene.pause();
        //     this.scene.run("Pause");
        //     this.scene.setVisible(false, "playGame");
        // }
    }
}