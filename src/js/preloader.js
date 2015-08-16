(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {
    preload: function () {
      this.game.time.advancedTiming = true;

      this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
      this.load.setPreloadSprite(this.asset);

      // this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      // this.loadResources();
      this.game.load.image('redbean', 'assets/redbean.png');
      this.game.load.image('yellowbean', 'assets/yellowbean.png');
      this.ready = true;
    },

    loadResources: function () {
      // load your assets here

    },

    create: function () {

    },

    update: function () {
      // if (!!this.ready) {
      //  this.game.state.start('menu');
        this.game.state.start('game');
      // }
    },

    onLoadComplete: function () {
      // this.ready = true;
    }
  };

  window['meanbeans'] = window['meanbeans'] || {};
  window['meanbeans'].Preloader = Preloader;
}());
