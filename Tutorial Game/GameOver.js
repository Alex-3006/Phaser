class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    init(data){
        this.level = data.level;
    }

    create() {
        title = this.add.text(275, 25, 'Game Over', { fontSize: '40px', fill: '#fff' });
        levelText = this.add.text(550, 30, 'Level : ' + level, { fontSize: '40px', fill: '#fff' });
        text = this.add.text(100, 125, 'Press e to start', { fontSize: '32px', fill: '#fff' });
        text1 = this.add.text(100, 225, 'Press s to enter settings', { fontSize: '32px', fill: '#fff' });
        text2 = this.add.text(100, 325, 'Press m to go to the menu', { fontSize: '32px', fill: '#fff' });
        text3 = this.add.text(100, 425, 'Press x to exit', { fontSize: '32px', fill: '#fff' });
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    }

    update() {
        if (keyE.isDown) {
            title.destroy();
            levelText.destroy();
            text.destroy();
            text1.destroy();
            text2.destroy();
            text3.destroy();
            this.add.text(20, 20, "Loading game...");
            setTimeout(() => {
                level = 0;
                this.scene.start("playGame");
            }, 1000);
            setTimeout(() => {
                this.scene.stop("GameOver");
            }, 1000);
        }

        if (keyS.isDown) {
            this.scene.start("settings");
            level = 0;
            this.scene.stop("GameOver");
        }

        if (keyM.isDown) {
            this.scene.start('Menu');
            level = 0;
            this.scene.stop("GameOver");
        }

        if (keyX.isDown) {
            game.destroy(true, false);
            this.scene.stop("GameOver");
        }
    }
}