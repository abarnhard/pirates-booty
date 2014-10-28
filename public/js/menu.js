var menu = (function(){
  var o = {
    preload: preload,
    create: create,
    update: update
  };

  function preload(){
    game.load.image('background', '/assets/background.png');
  }

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    var text = game.add.text(game.world.centerX, game.world.centerY, "Press SPACE to Begin");
    text.anchor.setTo(0.5);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(start);

  }

  function start(){
    game.state.start('level1');
  }

  return o;
})();
