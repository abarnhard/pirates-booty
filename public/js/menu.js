(function(){
  game.state.add('menu', {preload:preload, create:create});

  function preload(){
    //game.load.image('background', '/assets/backgrounds/background.png');
    game.load.tilemap('mario', '/assets/backgrounds/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('mario2', '/assets/backgrounds/marioLevel2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('cave', '/assets/backgrounds/background.png');
    game.load.image('menu', '/assets/backgrounds/PiratesBooty.png');
    game.load.image('tiles', '/assets/backgrounds/worldfinal.png');
    game.load.image('boat', '/assets/backgrounds/boatWater2.png');
    game.load.image('cloud1', '/assets/backgrounds/cloud1.png');
    game.load.image('gameOverScreen', '/assets/backgrounds/gameOver.png');
    game.load.image('restart', '/assets/backgrounds/restart.png');
    game.load.image('replay', '/assets/backgrounds/replay.png');
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
    // Audio
    game.load.audio('jump', '/assets/music/Sonic_spring.wav');
    game.load.audio('bowShot', '/assets/music/Sonic_hit_enemy.wav');
    game.load.audio('getCoin', '/assets/music/Sonic_ring.wav');
    game.load.audio('enemyDeath', '/assets/music/Sonic_ding2.wav');
    game.load.audio('death', '/assets/music/Death.wav');
    game.load.audio('beatGame', '/assets/music/Defeat_bowser.wav');
    game.load.audio('theme_1', '/assets/music/level1_Theme.mp3');
    game.load.audio('theme_2', '/assets/music/level2_theme.mp3');

  }

var button, enterKey;


  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'menu');
    button = game.add.button(680, 275, 'start', startClick, this);
    button.scale.setTo(.5);

    enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.add(startLvl2);
  }

// **** Main Menu Start function **** ///
    function startClick () {
    this.game.state.start('lvl1');
  }

  function startLvl2(){
    game.state.start('lvl2');
  }


})();
