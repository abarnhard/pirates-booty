(function(){
  game.state.add('won', {create:create});

  var button;

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'foundTres');
    button = game.add.button(550, 200, 'replay', replay, this);
    button.scale.setTo(.7);


  }

  // ***** Game Over Restart Game Function ***** /////
    function replay(){
      this.game.state.start('menu')
    }



})();
