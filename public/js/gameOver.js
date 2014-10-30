(function(){
  game.state.add('gameOver', {create:create});


  var restartB;

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'gameOver');
    restartB = game.add.restart(250, 350, 'restart', restartLevel, this);

  }


  // ***** Game Over Restart Game Function ***** /////
    function restartLevel(){
      this.game.state.start('lvl1')
    }



})();
