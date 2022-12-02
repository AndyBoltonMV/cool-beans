import { Game } from "phaser";
let scoreHTML = document.querySelector("#score")
let strikesHTML = document.querySelector("#strikes")

let beans;
let bean;
let createBean;
let player;
let score = 0;
let cursors;
let frameCount = 0;
let strikes = 0;
let scoreText;

const myGame = new Game({
  // Game config here
  type: Phaser.AUTO,  // type (WebGL or Canvas chosen automatically)
  width: 928,
  height: 793,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {y: 300},
      debug: false,
    },
  },
  scene: { 
    preload() {
      // Code that needs to run before the game is on the screen
      // Anything we need such as images should definitely happen in preload
      this.load.image("background", "/assets/background.png");
      this.load.image("andy", "assets/andy.png")
      this.load.image("bean", "assets/bean.png")
      beans = this.physics.add.staticGroup();
      cursors = this.input.keyboard.createCursorKeys()
      createBean = () => bean = beans.create(Math.random()*864, Math.random()*729, "bean").refreshBody().setOrigin(0,0)
    },
    create() {
      // Code that runs as soon as the game is on the screen
      scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFF' });
      this.add.image(0, 0, "background").setOrigin(0, 0)
      player = this.physics.add.image(400, 0, "andy").setOrigin(0, 0)
      player.setBounce(0.5)
      player.setCollideWorldBounds(true)
      this.physics.add.overlap(
        player,
        beans,
        () => {
          score += 1
          scoreText.setText('Score: ' + score);
          console.log(score)
          bean.destroy()
          scoreHTML.innerHTML = score
        }
      )
    },
    update() {
      // Code that runs for every frame rendered in the browser
      if (cursors.right.isDown) {
        player.setVelocityX(160)
      } else if (cursors.left.isDown) {
        player.setVelocityX(-160)
      } else if (cursors.up.isDown) {
        player.setVelocityY(-280)
      }
      frameCount += 1
      if (frameCount % 165 == 0) {
        if (bean) {
          bean.destroy()
          // strikes += 1
          // strikesHTML.innerHTML = strikes
        }
        if (frameCount < 1500) {
          createBean()
        }
      }
    },
  },
});