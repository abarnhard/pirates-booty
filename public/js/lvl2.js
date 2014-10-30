(function(){
  game.state.add('lvl2', {create:create, update:update, render:render});

  var map, layer, player, cursors, spaceKey, arrows, ladyPirate, isShooting, tile = 32, score = 0, scoreText, pFrame,
      FRAME_L = 117,
      FRAME_R = 143,
      skPath = [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150, -150],
      skIndex;

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = null;
    // set path index
    skIndex = 0;
    // add audio
    theme_2 = game.add.audio('theme_2');
    jump = game.add.audio('jump');
    bowShot = game.add.audio('bowShot');
    getCoin = game.add.audio('getCoin');
    enemyDeath = game.add.audio('enemyDeath');
    death = game.add.audio('death');
    beatGame = game.add.audio('beatGame');

    map = game.add.tilemap('mario2');
    map.addTilesetImage('worldfinal', 'tiles');
    map.addTilesetImage('treasurechest', 'treasurechest');
    map.addTilesetImage('torch', 'torch');
    map.setCollisionBetween(1, 44);
    map.setCollisionBetween(51, 66);
    map.setCollisionBetween(75, 78);
    map.setCollisionBetween(100, 110);


    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();


    ladyPirates = game.add.group();
    ladyPirates.enableBody = true;
    ladyPirates.createMultiple(20, 'elf');
    ladyPirates.forEach(function(lp){
      lp.frame = FRAME_L;
      lp.animations.add('jump', [13, 14, 15, 16, 17, 18, 19], 20, false);
      lp.animations.add('fly', [26, 27, 28, 29, 30, 31, 32], 10, true);
      game.physics.enable(lp, Phaser.Physics.ARCADE);
      lp.anchor.set(0.5, 0.5);
      lp.body.setSize(28, 50, 0, 5);
    });
    ladyPirates.setAll('body.collideWorldBounds', true);
    ladyPirates.setAll('body.gravity.y', 400);
    ladyPirates.setAll('body.bounce.y', 0.1);
    ladyPirates.setAll('body.linearDamping', 1);

    var ladyPiratePosition = [784, 816, 1094, 1488, 1520, 1840, 1872, 2384, 3184, 4464, 4592, 4784, 5360, 5520, 5616, 5744, 5962, 5154, 6186];
    var counter=0;
    ladyPirates.forEach(function(ladyPirate){
      ladyPirate.reset(ladyPiratePosition[counter], 0);
      ladyPirate.animations.play('fly', 5, true);
      counter++;
     }, this);

    skeletons = game.add.group();
    skeletons.enableBody = true;
    skeletons.createMultiple(13, 'orc');
    skeletons.forEach(function(sk){
      sk.frame = FRAME_L;
      sk.animations.add('left', [117, 118, 119, 120, 121, 122, 123, 124, 125], 10, false);
      sk.animations.add('right', [143, 144, 145, 146, 147, 148, 149, 150, 151], 10, false);
      sk.animations.add('walk', [143, 144, 145, 146, 147, 148, 149, 150, 151, 117, 118, 119, 120, 121, 122, 123, 124, 125], 10, true);
      sk.animations.add('jump', [13, 14, 15, 16, 17, 18, 19], 20, false);
      sk.animations.add('fly', [26, 27, 28, 29, 30, 31, 32], 10, true);
      game.physics.enable(sk, Phaser.Physics.ARCADE);
      sk.anchor.set(0.5, 0.5);
      sk.body.setSize(28, 50, 0, 5);
      sk.spriteHasLanded = false;
    });
    skeletons.setAll('body.collideWorldBounds', true);
    skeletons.setAll('body.gravity.y', 400);
    skeletons.setAll('body.bounce.y', 0.1);
    skeletons.setAll('body.linearDamping', 1);

    var skeletonPosition = [336, 416, 720, 1648, 2064, 2480, 3312, 3664, 4064, 4154, 4912, 5040, 6385];
    var counter=0;
    skeletons.forEach(function(skeleton){
      skeleton.reset(skeletonPosition[counter], 0);
      // skeleton.animations.play('walk');
      counter++;
     }, this);

    player = game.add.sprite((2 * tile) - 16, 200, 'hero');
    player.frame = FRAME_R;
    player.animations.add('still', [130, 131, 132, 133, 134, 135, 136, 137, 138], 10, true);
    player.animations.add('jump', [26, 27, 28, 29, 30, 31, 32], 10, true);
    var shootL = player.animations.add('shootLeft', [221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233], 50, false),
        shootR = player.animations.add('shootRight', [247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259], 50, false),
        walkL  = player.animations.add('left', [117, 118, 119, 120, 121, 122, 123, 124, 125], 10, true),
        walkR  = player.animations.add('right', [143, 144, 145, 146, 147, 148, 149, 150, 151], 10, true);
    shootL.onComplete.add(resetShot);
    shootR.onComplete.add(resetShot);

    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.anchor.set(0.5, 0.5);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 450;
    player.body.setSize(18, 50, 0, 5);
    player.body.bounce.y = 0.1;
    player.body.linearDamping = 1;

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(shoot);

    coins = game.add.group();
    coins.enableBody = true;
    for(var i = 0; i < 120; i++){
      var coin = coins.create(i * 100, 0, 'coin');
      coin.body.gravity.y = 450;
      coin.body.bounce.y = 0.7 + Math.random() * 0.2;
      coin.animations.add('turn');
      coin.animations.play('turn', 5, true);
    }

    arrows = game.add.group();
    arrows.enableBody = true;
    arrows.createMultiple(2, 'arrow');
    isShooting = false;

    scoreText = game.add.text(game.camera.x, game.camera.y, 'score: 0', { fontSize: '32px', fill: '#000', align: 'center' });

    theme_2.loop = true;
    theme_2.play();
  }

  function update(){
    // set score x & y
    scoreText.x = game.camera.x;
    scoreText.y = game.camera.y;
    // init collisions and overlaps
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(coins, layer);
    game.physics.arcade.collide(ladyPirates, layer);
    game.physics.arcade.collide(skeletons, layer);
    game.physics.arcade.overlap(arrows, layer, killShot, null, this);
    game.physics.arcade.overlap(arrows, ladyPirates, killNpc, null, this);
    game.physics.arcade.overlap(arrows, skeletons, killNpc, null, this);
    game.physics.arcade.overlap(player, coins, collectCoin, null, this);
    game.physics.arcade.overlap(player, ladyPirates, playerDies, null, this);
    game.physics.arcade.overlap(player, skeletons, playerDies, null, this);

    // save off sprite frame representing direction of travel
    if(parseInt(player.body.velocity.x) !== 0){
      // console.log('Player x velocity:', parseInt(player.body.velocity.x))
      if(parseInt(player.body.velocity.x) < 0){
        pFrame = FRAME_L;
      }else{
        pFrame = FRAME_R;
      }
      // console.log('pFrame:', pFrame);
    }

    // stop player
    player.body.velocity.x = 0;
    // kill arrows if they are more than 600px away from the player
    arrows.forEachAlive(function(shot){
      distanceFromPlayer = 600;
      if(Math.abs(player.x - shot.x) >= distanceFromPlayer){
        shot.kill();
      }
    }, this);

    // make all pirates jump
    ladyPirates.forEachAlive(function(lp){
      if(lp.body.onFloor()){
        lp.animations.play('fly');
        lp.body.velocity.y = -400;
      }
    }, this);
    /* make skeletons jump
    skeletons.forEachAlive(function(sk){
      if(sk.body.onFloor()){
        sk.animations.play('fly');
        sk.body.velocity.y = -400;
      }
    }, this);*/
    // make all skeletons walk

    /*
    console.log('skIndex', skIndex);
    console.log('skPath.length', skPath.length);
    console.log('skIndex === 0', skIndex === 0);
    console.log('skIndex === skPath.length - 1', skIndex === skPath.length - 1);
    */
    skeletons.forEachAlive(function(sk){
      if(sk.body.onFloor() && !sk.spriteHasLanded){
        sk.spriteHasLanded = true;
      }
      if(sk.spriteHasLanded){
        sk.body.velocity.x = 0;
        if(skIndex === 0){
          sk.animations.play('right');
        }
        if(skIndex === skPath.length - 1){
          sk.animations.play('left');
        }
        sk.body.velocity.x = skPath[skIndex];
      }
    });
    skIndex = skIndex + 1 >= skPath.length ? 0 : skIndex + 1;

    // check input keys to determine movement
    if(cursors.left.isDown){
      player.body.velocity.x = -250;
      if(!isShooting){player.animations.play('left');}
    }else if(cursors.right.isDown){
      player.body.velocity.x = 250;
      if(!isShooting){player.animations.play('right');}
    }else{
      player.body.velocity.x = 0;
      if(!isShooting){
        player.animations.stop();
        player.frame = pFrame;
      }
    }
    if(cursors.up.isDown && player.body.onFloor()){
      player.body.velocity.y = -400;
      jump.play();
    }
    // check if player has made it to the door to lvl2
    if(Math.abs(player.x - (tile * 212)) <= 20 && Math.abs(player.y - (4 * tile)) >= 32){
      player.destroy();
      theme_2.stop();
      beatGame.play();
      game.world.setBounds(0, 0, 0, 0);
      game.state.start('won');
    }
    // check if player fell into lava
    var screenHeight = 480;
    if(player.y >= screenHeight - tile){
      gameOver();
    }
  }

  function collectCoin (player, coin) {
    getCoin.play();
    coin.kill();
    score += 100;
    scoreText.text = 'Score: ' + score;
  }

  function render(){
//    game.debug.body(player);
    game.debug.body(layer);
  }

  function shoot(){
    var shot = arrows.getFirstDead(),
        offset = 15;
    if(!shot){return;}
    // player facing left, 143 is the first frame of facing right
    // the first frame of facing left is 117
    // console.log('left cursor is down:', cursors.left.isDown);
    // console.log('right cursor is down:', cursors.right.isDown);
    // console.log('player frame:', player.frame);
    if(cursors.left.isDown || player.frame < FRAME_R && !cursors.right.isDown){
      isShooting = true;
      bowShot.play();
      player.animations.play('shootLeft');
      shot.frame = 1;
      shot.reset(player.x - offset, player.y - offset);
      shot.body.velocity.x = -350;
      // player is facing right
    }else if(cursors.right.isDown || player.frame >= FRAME_R && !cursors.left.isDown){
      isShooting = true;
      bowShot.play();
      player.animations.play('shootRight');
      shot.frame = 0;
      shot.reset(player.x + offset, player.y - offset);
      shot.body.velocity.x = 350;
    }
  }

  function resetShot(){
    isShooting = false;
  }

  function killShot(shot, layer){
    shot.kill();
  }

  function killNpc(shot, npc){
    enemyDeath.play();
    shot.kill();
    npc.kill();
  }

  function updateText(){
    scoreText.setText("Score: " +score);
  }

  function playerDies(player, npc){
    player.kill();
    gameOver();
  }

  function gameOver(){
    theme_2.stop();
    death.play();
    game.world.setBounds(0, 0, 0, 0);
    game.state.start('gameOver');
  }

})();
