(function(){
  game.state.add('gameOver', {create:create});

  var button;

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'gameOverScreen');
    button = game.add.button(220, 350, 'restart', restartLevel, this);

  }

  // ***** Game Over Restart Game Function ***** /////
    function restartLevel(){
      game.world.setBounds(0, 0, 0, 0);
      this.game.state.start('lvl1')
    }



})();
