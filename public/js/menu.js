var menu = (function(){
  var o = {
    preload: preload,
    create: create,
    update: update
  };

//var button;

  function preload(){
    game.load.image('bg', '/assets/background.png');
    //game.load.spritesheet('button', '/assets/button_sprite_sheet.png', 193, 71);
    game.load.spritesheet('button', '/assets/START3.png');

  }

  function create(){

    game.add.sprite('0', '0', 'bg');
    button = game.add.button(game.world.centerX - 140, game.world.centerY - 140, 'button', startClick);
  }

  function update(){

  }

  function startClick () {
    this.game.state.start('lvl1');
  }

  return o;
})();
