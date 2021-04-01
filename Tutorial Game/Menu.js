class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    create() {
        title = this.add.text(350, 25, 'Menu', { fontSize: '40px', fill: '#fff' });
        text = this.add.text(100, 125, 'Press e to start', { fontSize: '32px', fill: '#fff' });
        text2 = this.add.text(100, 225, 'Press s to enter settings', { fontSize: '32px', fill: '#fff' });
        text1 = this.add.text(100, 325, 'Press x to exit', { fontSize: '32px', fill: '#fff' });
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update() {
        if (keyE.isDown) {
            title.destroy();
            text.destroy();
            text1.destroy();
            text2.destroy();
            this.add.text(20, 20, "Loading game...");
            setTimeout(() => {
                this.scene.start("playGame");
            }, 1000);
            setTimeout(() => {
                this.scene.stop("Menu");
            }, 1000);
        }

        if (keyX.isDown) {
            game.destroy(true, false);
            this.scene.stop("Menu");
        }

        if (keyS.isDown) {
            this.scene.start("settings");
            this.scene.stop("Menu");
        }
    }
}