var lvl1 = (function(){
  var o = {
    preload: preload,
    create: create,
    update: update
  };

  function preload(){

  }
var score, txtScore, timer, time, txtTime, platforms, dude, jump, dead;

  function create(){
    score = 0, time = 120;

    game.add.tileSprite(0,0, 200, 40, 'background');
    txtScore = game.add.text(20, 20, "0",   { font: "30px Arial", fill: "#ffffff" });
    txtTime  = game.add.text(740, 20, time, { font: "30px Arial", fill: "#ffffff" });
    timer = game.time.events.loop(1000, subtractTime);
  }

  function update(){
    if(cursors.left.isDown){
      dude.body.velocity.x = -150;
//      dude.animations.play('left');
    }
    else if(cursors.right.isDown){
      dude.body.velocity.x = 150;
//      dude.animations.play('right');
    }else{
      dude.body.velocity.x = 0;
      dude.animations.stop();
//      dude.frame = 4;
    }

    if(cursors.up.isDown && dude.body.touching.down){
      dude.body.velocity.y = -350;
    }
  }

    function subtractTime(){
      time--;
      txtTime.text = time;
      if(!time){
        game.state.restart();
      }
    }

  return o;
})();
