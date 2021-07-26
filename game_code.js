
let player, ball, violetBricks, yellowBricks, redBricks, cursors,powerOut,powerUP;
let openingText, gameOverText, playerWonText;
let gameStarted = false;
let xPos = 0;
let yPos = 0;
let playerLife = 3;
let isgamePaused = false;
let yVeloc = -200;
let a = [1,2,3,1,2,1,2,3,2,1,1,2,3,4,1,2,3,1,5,1,2,3,4,1,1,2,3,2,5,1,2,3,1,2,1,2,3,3,1,2,3,2,3,1,2,1,3,1]
// This object contains all the Phaser configurations to load our game
const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    heigth: 640,
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
      preload,
      create,
      update,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: false,
        debug: false
      },
    }
  };
  
  // Create the game instance
  const game = new Phaser.Game(config);
  

function preload() { 
        this.load.image('ball', 'assets/images/ball_32_32.png');
        this.load.image('paddle', 'assets/images/paddle_128_32.png');
        this.load.image('brick1', 'assets/images/brick1_64_32.png');
        this.load.image('brick2', 'assets/images/brick2_64_32.png');
        this.load.image('brick3', 'assets/images/brick3_64_32.png');
        this.load.image('powerUP', 'assets/images/powerUp.png');
        this.load.image('powerOut', 'assets/images/powerOut.png');
}

function create() { 
    player = this.physics.add.sprite(
        400,
        600,
        'paddle',
      );
      ball = this.physics.add.sprite(
        400,
        565,
        'ball'
      );

       xPos = -16;
       yPos = 48;
    for (let i = 0; i< a.length ; i++) {
      if (i === 12){
        xPos = -16;
        yPos = 80;
      }
      if (i === 24){
        xPos = -16;
        yPos = 112;
      }
      if (i === 36){
        xPos = -16;
        yPos = 144;
      }
      xPos += 64;
    switch(a[i]) {
      case 1:
      violetBricks = this.physics.add.group({
        key: 'brick1',
        setXY: {
          x: xPos,
          y: yPos
        }
      });
      this.physics.add.collider(ball, violetBricks, hitBrick, null, this);
      break;
      case 2:
      // Add yellow bricks
yellowBricks = this.physics.add.group({
    key: 'brick2',
    setXY: {
      x: xPos,
      y: yPos
    }
  });
  this.physics.add.collider(ball, yellowBricks, hitBrick, null, this);
  break;
  case 3:
  // Add red bricks
  redBricks = this.physics.add.group({
    key: 'brick3',
    setXY: {
      x: xPos,
      y: yPos
    }
  });
  this.physics.add.collider(ball, redBricks, hitBrick, null, this);
  break;
  case 4:
  // Add powerups
  powerUP = this.physics.add.group({
    key: 'powerUP',
    setXY: {
      x: xPos,
      y: yPos
    }
  });
  this.physics.add.collider(ball, powerUP, hitPower, null, this);
  this.physics.add.collider(player, powerUP, hitPowerUp, null, this);
  break;
  case 5:
  // Add powerOuts
  powerOut = this.physics.add.group({
    key: 'powerOut',
    setXY: {
      x: xPos,
      y: yPos
    }
  });
  this.physics.add.collider(ball, powerOut, hitPower, null, this);
  this.physics.add.collider(player, powerOut, hitPowerOut, null, this);
}
}
  cursors = this.input.keyboard.createCursorKeys();
  player.setCollideWorldBounds(true);
  player.setImmovable(true);
  ball.setCollideWorldBounds(true);
  ball.setBounce(1, 1);
  this.physics.world.checkCollision.down = false;
  // this.physics.add.collider(ball, violetBricks, hitBrick, null, this);
  // this.physics.add.collider(ball, yellowBricks, hitBrick, null, this);
  // this.physics.add.collider(ball, redBricks, hitBrick, null, this);
  // this.physics.add.collider(ball, powerOut, hitPower, null, this);
  // this.physics.add.collider(ball, powerUP, hitPower, null, this);
  // this.physics.add.collider(player, powerOut, hitPowerOut, null, this);
  // this.physics.add.collider(player, powerUP, hitPowerUp, null, this);
  this.physics.add.collider(ball, player, hitPlayer, null, this);

  // Starting Message
  openingText = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 2,
    'Press SPACE To Start The Game',
    {
      fontFamily: 'Arial, Courier, monospace',
      fontSize: '30px',
      fill: '#fff'
    }
  );
  openingText.setOrigin(0.5);

  // Create Game End Message
  gameOverText = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 2,
    'Game End',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '50px',
      fill: '#fff'
    }
  );
  gameOverText.setOrigin(0.5);
  gameOverText.setVisible(false);

  // Create the game won text
  playerWonText = this.add.text(
    this.physics.world.bounds.width / 2,
    this.physics.world.bounds.height / 2,
    'YOU HAVE WON THE GAME',
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '30px',
      fill: '#fff'
    }
  );
  playerWonText.setOrigin(0.5);
  playerWonText.setVisible(false);

  // Create the player life lines text
  playerLifeText = this.add.text(
    0 ,
    0,
    'Life lefts:' + playerLife ,
    {
      fontFamily: 'Monaco, Courier, monospace',
      fontSize: '30px',
      fill: '#fff'
    }
  );
  playerLifeText.setOrigin(0);
  playerLifeText.setVisible(true);

var pausekey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
pausekey.on('down', onSpaceBarPressing);
}

function update() { 
    // Check if the ball left the scene i.e. game over
  if (isGameOver(this.physics.world)) {
    gameOverText.setVisible(true);
    ball.disableBody(true, true);
  } else if (isWon()) {
    playerWonText.setVisible(true);
  ball.disableBody(true, true);
  } else {
    // Put this in so that the player stays still if no key is being pressed
    player.body.setVelocityX(0);
    if (cursors.left.isDown) {
    player.body.setVelocityX(-350);
    } else if (cursors.right.isDown) {
    player.body.setVelocityX(350);
    }
    if (!gameStarted) {
      ball.setX(player.x);
      if (cursors.space.isDown) {
        gameStarted = true;
        ball.setVelocityY(yVeloc);
        openingText.setVisible(false);
      }
    }
  if (gameStarted) {
    // if (ball.body.velocity.y === 0) {
    //     ball.setVelocityY(200);
    // }
  }
  }
}

function isGameOver(world) {
    if (ball.body.y > world.bounds.height) {
      playerLife--;
      playerLifeText.setText('Life lefts:' + playerLife);
      gameStarted = false;
      ball.body.y = 550;
      ball.body.setVelocityX(0);
      ball.body.setVelocityY(0);
    }
    if (playerLife === 0) {
      return true;
    }
}
function isWon() {
    return violetBricks.countActive() + yellowBricks.countActive() + redBricks.countActive() === 0;
}
function hitBrick(ball, brick) {
    brick.disableBody(true, true);
    brick.setVisible(false);

    if (ball.body.velocity.x === 0) {
    randNum = Math.random();
    if (randNum >= 0.5) {
    ball.body.setVelocityX(150);
    } else {
    ball.body.setVelocityX(-150);
    }
    ball.body.setVelocityY(-yVeloc);
    }
}
function hitPlayer(ball, player) {
    // Increase the velocity of the ball after it bounces
    if (gameStarted) {
    // ball.setVelocityY(ball.body.velocity.y - 5);
    
  
    // let newXVelocity = Math.abs(ball.body.velocity.x) + 5;
    // // If the ball is to the left of the player, ensure the X-velocity is negative
    // if (ball.x < player.x) {
    //   ball.setVelocityX(-newXVelocity);
    // } else {
    //   ball.setVelocityX(newXVelocity);
    // }
  }
  }
  function hitPower(ball, power) {

    if (ball.body.velocity.x === 0) {
    randNum = Math.random();
    if (randNum >= 0.5) {
    ball.body.setVelocityX(150);
    } else {
    ball.body.setVelocityX(-150);
    }
    ball.body.setVelocityY(150);
    }
    power.body.setVelocityX(0);
    power.body.setVelocityY(200);
  }

function hitPowerUp(player, powerUP) {
  powerUP.disableBody(true, true);
  powerUP.setVisible(false);
  player.setScale(2);
  player.setImmovable(true);
  player.body.setVelocityX(0);
  if (cursors.left.isDown) {
  player.body.setVelocityX(-350);
  } else if (cursors.right.isDown) {
  player.body.setVelocityX(350);
  }
}
function hitPowerOut(player, powerOuts) {
  powerOuts.disableBody(true, true);
  powerOuts.setVisible(false);
  player.setImmovable(true);
  yVeloc = 2* yVeloc;
  ball.body.setVelocityY(-yVeloc);
}
function onSpaceBarPressing() {
  if(!game.scene.scenes[0].physics.world.isPaused) {
  game.scene.scenes[0].physics.world.isPaused = true;
  } else {
    game.scene.scenes[0].physics.world.isPaused = false;
  }
}