(function(){
  game.state.add('lvl1', {create:create, update:update, render:render});

  var map, layer, player, cursors, spaceKey, arrows, ladyPirate, isShooting, tile = 32, score = 0, scoreText;

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#6686ff';

    map = game.add.tilemap('mario');
    map.addTilesetImage('worldfinal', 'tiles');
    map.addTilesetImage('cloud1', 'cloud1');
    map.addTilesetImage('boatWater2', 'boat');
    map.setCollisionBetween(1, 18);
    map.setCollisionBetween(98);

    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld();

    ladyPirates = game.add.group();
    ladyPirates.enableBody = true;
    ladyPirates.createMultiple(18, 'ladyPirate');
    ladyPirates.forEach(function(lp){
      lp.animations.add('fly', [26, 27, 28, 29, 30, 31, 32], 10, true);
      game.physics.enable(lp, Phaser.Physics.ARCADE);
      lp.anchor.set(0.5, 0.5);
      lp.body.setSize(28, 50, 0, 5);
    });
    ladyPirates.setAll('body.collideWorldBounds', true);
    ladyPirates.setAll('body.gravity.y', 400);
    ladyPirates.setAll('body.bounce.y', 0.1);
    ladyPirates.setAll('body.linearDamping', 1);

    var ladyPiratePosition = [944, 1456, 1776, 2128, 2448, 2896, 3408, 3696, 3984, 4240, 4432, 5232, 5424, 6320, 6386, 6608];
    var counter=0;
    ladyPirates.forEach(function(ladyPirate){
      ladyPirate.reset(ladyPiratePosition[counter], 0);
      ladyPirate.animations.play('fly', 5, true);
      counter++;
     }, this);

    skeletons = game.add.group();
    skeletons.enableBody = true;
    skeletons.createMultiple(17, 'skeleton');
    skeletons.forEach(function(sk){
      sk.animations.add('left', [117, 118, 119, 120, 121, 122, 123, 124, 125], 10, true);
      sk.animations.add('right', [143, 144, 145, 146, 147, 148, 149, 150, 151], 10, true);
      sk.animations.add('still', [130, 131, 132, 133, 134, 135, 136, 137, 138], 10, true);
      game.physics.enable(sk, Phaser.Physics.ARCADE);
      sk.anchor.set(0.5, 0.5);
      sk.body.setSize(28, 50, 0, 5);
    });
    skeletons.setAll('body.collideWorldBounds', true);
    skeletons.setAll('body.gravity.y', 400);
    skeletons.setAll('body.bounce.y', 0.1);
    skeletons.setAll('body.linearDamping', 1);

    var skeletonPosition = [624, 1936, 2704, 2960, 3216, 3568, 3824, 3856, 4048, 4304, 4560, 4816, 4880, 5264, 5680, 5936, 6448];
    var counter=0;
    skeletons.forEach(function(skeleton){
      skeleton.reset(skeletonPosition[counter], 0);
      counter++;
     }, this);












    player = game.add.sprite(20, 200, 'hero');
    player.animations.add('left', [117, 118, 119, 120, 121, 122, 123, 124, 125], 10, true);
    player.animations.add('right', [143, 144, 145, 146, 147, 148, 149, 150, 151], 10, true);
    player.animations.add('still', [130, 131, 132, 133, 134, 135, 136, 137, 138], 10, true);
    player.animations.add('jump', [26, 27, 28, 29, 30, 31, 32], 10, true);
    var shootL = player.animations.add('shootLeft', [221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233], 50, false),
        shootR = player.animations.add('shootRight', [247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259], 50, false);
    shootL.onComplete.add(resetShot);
    shootR.onComplete.add(resetShot);

    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.anchor.set(0.5, 0.5);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 450;
    player.body.setSize(18, 50, 0, 5);
    player.body.bounce.y = 0.3;
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
  }

  function update(){
    scoreText.x=game.camera.x;
    scoreText.y=game.camera.y;

    game.physics.arcade.collide(player, layer);
    player.body.velocity.x = 0;
    game.physics.arcade.collide(coins, layer);
    game.physics.arcade.collide(ladyPirates, layer);
    game.physics.arcade.collide(skeletons, layer);
    game.physics.arcade.overlap(arrows, layer, killShot, null, this);
    game.physics.arcade.overlap(arrows, ladyPirates, killNpc, null, this);
    game.physics.arcade.overlap(player, coins, collectCoin, null, this);

    arrows.forEachAlive(function(shot){
      distanceFromPlayer = 600;
      if(Math.abs(player.x - shot.x) >= distanceFromPlayer){
        shot.kill();
      }
    }, this);

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
        player.frame = 130;
      }
    }
    if(cursors.up.isDown && player.body.onFloor()){
      player.body.velocity.y = -400;
    }

    if(Math.abs(player.x - (tile * 212)) <= 20 && Math.abs(player.y - (4 * tile)) >= 32){
      game.state.start('lvl2');
    }
    var screenHeight = 480;
    if(player.y >= screenHeight - (tile * 3)){
      // game.state.restart();
    }
  }

  function collectCoin (player, coin) {
    coin.kill();
    score += 100;
    scoreText.text = 'Score: ' + score;
  }

  function render(){
    game.debug.body(player);
    game.debug.body(layer);
  }

  function shoot(){
    var shot = arrows.getFirstDead(),
        offset = 15;
    if(!shot){return;}
    if(cursors.left.isDown){
      isShooting = true;
      player.animations.play('shootLeft');
      shot.frame = 1;
      shot.reset(player.x - offset, player.y - offset);
      shot.body.velocity.x = -350;
    }else if(cursors.right.isDown){
      isShooting = true;
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
    shot.kill();
    npc.kill();
  }

  function updateText(){
    scoreText.setText("Score: " +score);
  }

})();
