class Settings extends Phaser.Scene {
    constructor() {
        super("settings");
    }

    create() {
        title = this.add.text(275, 25, 'Settings', { fontSize: '40px', fill: '#fff' });
        text2 = this.add.text(100, 125, 'Press m to enter menu', { fontSize: '32px', fill: '#fff' });
        text1 = this.add.text(100, 225, 'Press x to exit the game', { fontSize: '32px', fill: '#fff' });
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    }

    update() {
        if (keyX.isDown) {
            game.destroy(true, false);
            this.scene.stop("settings");
        }

        if (keyM.isDown) {
            this.scene.start("Menu");
            this.scene.stop("settings");
        }
    }
}