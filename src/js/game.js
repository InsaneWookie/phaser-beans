(function () {
  'use strict';

  function Game() {
  }

  Game.prototype = {

    text: null,
    beanTick: 1000, //tick every 100 ms
    lastBeanTime: 0,
    redBean: null, //been sprite
    yellowBean: null, //been sprite
    currentBean: {
      primary: null, //center bean that the other bean rotates around
      secondary: null,
      place: 'up' //where the seconday is in relation to the primary
    },

    grid: [

    ],

    playArea: new Phaser.Point(96, 192),

    create: function () {
      this.input.onDown.add(this.onInputDown, this);

      //var graphics = this.add.graphics(100, 100);
      //graphics.beginFill(0xFF3300);
      //graphics.lineStyle(2, 0x0FF0FF, 1);
      //graphics.drawRect(50, 250, 100, 100);

      this.currentBean.primary = this.game.add.sprite(48, 16, 'redbean');
      this.currentBean.secondary = this.game.add.sprite(0, 0, 'yellowbean');

      //generate grid?


      //var tween = this.game.add.tween(bean);

      //  The object defines the properties to tween.
      //  In this case it will move to x 600
      //  The 6000 is the duration in ms - 6000ms = 6 seconds
      //tween.to({ y: 200 }, 6000);

      //  And this starts it going
      //tween.start();

      //this.text = this.game.add.text(300, 264, "Frame 1", {font: "28px Arial", fill: "#ff0044"});
      this.lastBeanTime = this.game.time.now;

      var leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      var rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

      leftKey.onDown.add(function(){
        if(this.currentBean.primary.position.x > this.leftArea.x) {
          this.currentBean.primary.position.x -= this.currentBean.primary.width;
        }
      }, this);

      rightKey.onDown.add(function(){
        if(this.currentBean.primary.position.x < this.leftArea.width) {
          this.currentBean.primary.position.x += this.currentBean.primary.width;
        }
      }, this);


      this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function(){
        var p = this.currentBean.place;
        this.currentBean.place = (p === 'up') ? 'right' : (p === 'right') ? 'down' : (p === 'down') ? 'left' : 'up';
      }, this);

      this.leftArea = new Phaser.Rectangle(16,16, this.playArea.x,this.playArea.y);
      this.rightArea = new Phaser.Rectangle(208,16, this.playArea.x,this.playArea.y);


      this.lastBeanTime = this.game.time.time;
    },

    update: function (time) {
      //console.log(time);

      //want to move the bean a square every bean tick, or some shit

      if (this.game.time.elapsedSince(this.lastBeanTime) > this.beanTick) {
        //if((this.game.time.time - this.lastBeanTime) > this.beanTick){
        //move the bean
        if (this.currentBean.primary.position.y < (this.leftArea.height)) {
          this.currentBean.primary.position.y += this.currentBean.primary.height;
        }
            this.lastBeanTime = this.game.time.time;
      }



      //work out where to render the secondary
      if(this.currentBean.place === 'up'){
        this.currentBean.secondary.position.x = this.currentBean.primary.position.x;
        this.currentBean.secondary.position.y = this.currentBean.primary.position.y - 16;

      } else if(this.currentBean.place === 'down') {
        this.currentBean.secondary.position.x = this.currentBean.primary.position.x;
        this.currentBean.secondary.position.y = this.currentBean.primary.position.y + 16;

      } else if(this.currentBean.place === 'left') {
        this.currentBean.secondary.position.x = this.currentBean.primary.position.x - 16;
        this.currentBean.secondary.position.y = this.currentBean.primary.position.y;

      } else if(this.currentBean.place === 'right') {
        this.currentBean.secondary.position.x = this.currentBean.primary.position.x + 16;
        this.currentBean.secondary.position.y = this.currentBean.primary.position.y;

      }

      //if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      //  this.bean.position -= this.bean.width;
      //}
      //else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      //  this.bean.position += this.bean.width;
      //}


      this.game.debug.text(this.currentBean.primary.position || '--', 2, 14, "#00ff00");
      //this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
      //this.game.debug.text("Tween running: " + !this.idleBallTween.pendingDelete, 2, 110);

      this.game.debug.geom(this.leftArea, '#FF00FF', false);
      this.game.debug.geom(this.rightArea, '#FF00FF', false);

    },

    onInputDown: function () {
      this.game.state.start('menu');
    }
  };

  window['meanbeans'] = window['meanbeans'] || {};
  window['meanbeans'].Game = Game;
}());
