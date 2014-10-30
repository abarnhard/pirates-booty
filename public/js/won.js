(function(){
  game.state.add('won', {create:create});


var replay;

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);


    game.add.sprite(0, 0, 'foundTres');
    replay = game.add.replay(250, 450, 'replay', replay, this);


  }


  // ***** Game Over Restart Game Function ***** /////
    function replay(){
      this.game.state.start('menu')
    }



})();
