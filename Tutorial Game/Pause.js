class Pause extends Phaser.Scene {
    constructor() {
        super("Pause");
    }

    init(data) {
        this.level = data.level;
        this.score = data.score;
    }

    create() {
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        scoreText = this.add.text(5, 30, 'Score : ' + score, { fontSize: '40px', fill: '#fff' });
        levelText = this.add.text(550, 30, 'Level : ' + level, { fontSize: '40px', fill: '#fff' });
    }

    update() {
        if (keyE.isDown) {
            this.scene.stop();
            this.scene.resume("playGame");
            this.scene.setVisible(true, "playGame");
        }
    }
}