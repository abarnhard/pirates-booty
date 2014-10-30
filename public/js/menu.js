(function(){
  game.state.add('menu', {preload:preload, create:create});

  function preload(){
    //game.load.image('background', '/assets/backgrounds/background.png');
    game.load.tilemap('mario', '/assets/backgrounds/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('mario2', '/assets/backgrounds/marioLevel2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('menu', '/assets/backgrounds/PiratesBooty.png');
    game.load.image('tiles', '/assets/backgrounds/worldfinal.png');
    game.load.image('boat', '/assets/backgrounds/boatWater2.png');
    game.load.image('cloud1', '/assets/backgrounds/cloud1.png');
    game.load.image('gameOver', '/assets/backgrounds/gameOver.png');
    game.load.image('start', '/assets/skullStart.png');
    //CHARACTERS:
    game.load.spritesheet('hero', 'assets/characters/hero/hero.png', 64, 64, 265);
    game.load.spritesheet('ladyPirate', 'assets/characters/pirates/pirateGirl.png', 64, 64, 265);
    game.load.spritesheet('skeleton', 'assets/characters/pirates/skeleton.png', 64, 64, 265);
    game.load.spritesheet('elf', 'assets/characters/caveDwellers/elf.png', 64, 64, 265);
    game.load.spritesheet('orc', 'assets/characters/caveDwellers/spearOrc.png', 64, 64, 265);
    //Other
    game.load.spritesheet('coin', 'assets/otherAnimations/coin.png', 32, 32);
    game.load.spritesheet('arrow', 'assets/otherAnimations/arrow.png', 32, 32);
  }

var button;

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'menu');
    button = game.add.button(game.world.centerX + 280, 275, 'start', startClick, this);
    button.scale.setTo(.5);

    //game.add.tileSprite(0, 0, 800, 600, 'bg');
    //game.stage.backgroundColor = '#6686ff';

    //var text = game.add.text(game.world.centerX, game.world.centerY, 'Mario\nPress SPACE to Begin');
    //text.anchor.setTo(0.5);

    //var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    //spaceKey.onDown.add(start);

    // ******** for testing purposes, DELETE before production **********
    //var text2 = game.add.text(game.world.centerX - 200, game.world.centerY + 100, 'Press ENTER to check out Level 2');

    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.add(start2);
    // ******** END test function for level 2 *******
  }

//  function start(){
  //  game.state.start('lvl1');
  //}

    function startClick () {
    this.game.state.start('lvl1');
  }

  // ******** for testing purposes, DELETE before production **********
  function start2(){
    game.state.start('lvl2');
  }
  // ******** END test function for level 2 *******

})();
