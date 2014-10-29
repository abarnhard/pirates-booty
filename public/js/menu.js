(function(){
  game.state.add('menu', {preload:preload, create:create});

  function preload(){
    //game.load.image('background', '/assets/backgrounds/background.png');
    game.load.tilemap('mario', '/assets/backgrounds/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', '/assets/backgrounds/worldfinal.png');
    //CHARACTERS:
    game.load.spritesheet('hero', 'assets/characters/hero/hero.png', 64, 64, 265);
    game.load.spritesheet('ladyPirate', 'assets/characters/pirates/pirateGirl.png', 64, 64, 265);
    game.load.spritesheet('skeleton', 'assets/characters/pirates/skeleton.png', 64, 64, 265);
    game.load.spritesheet('elf', 'assets/characters/caveDwellers/elf.png', 64, 64, 265);
    game.load.spritesheet('orc', 'assets/characters/caveDwellers/spearOrc.png', 64, 64, 265);
    //Other
    game.load.spritesheet('coin', 'assets/otherAnimations/coin.png', 32, 32);
  }

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //game.add.tileSprite(0, 0, 800, 600, 'bg');
    game.stage.backgroundColor = '#6686ff';

    var text = game.add.text(game.world.centerX, game.world.centerY, 'Mario\nPress SPACE to Begin');
    text.anchor.setTo(0.5);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(start);
  }

  function start(){
    game.state.start('lvl1');
  }
})();
