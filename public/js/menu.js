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
    game.load.image('cloud2', '/assets/backgrounds/cloud2.png');
    game.load.image('gameOver', '/assets/backgrounds/gameOver.png');
    game.load.image('restart', '/assets/backgrounds/restart.png');
    game.load.image('foundTres', '/assets/backgrounds/foundTreasure.png');
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

  }

// **** Main Menu Start function **** ///
    function startClick () {
    this.game.state.start('lvl1');
  }


})();
