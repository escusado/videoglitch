Class('PhaserWrapper').inherits(Widget)({

  ELEMENT_CLASS:'phaser-wrapper',
  prototype : {
    init : function(config){
      Widget.prototype.init.call(this, config);
    },

    setup : function setup(){
      this.phaser = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, this.element, {
        preload : this.preload.bind(this),
        create  : this.create.bind(this),
        update  : this.update.bind(this)
      });

    },

    preload : function preload(){
      this.videoBitmap = this.phaser.add.bitmapData(window.innerWidth, window.innerHeight);
      this.videoBitmap.context.drawImage(app.videoEl, 0, 0);
      var videoSprite = this.phaser.add.sprite( window.innerWidth, window.innerHeight, this.videoBitmap );
    },

    create : function create(){

    },

    update : function update(){
      // console.log('>');
      // this.videoBitmap.context.drawImage(app.videoEl, 0, 0);
      app.takePic();
    }
  }
});