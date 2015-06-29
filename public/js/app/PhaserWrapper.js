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
      var graphics = this.phaser.add.graphics(0, 0);
      graphics.beginFill(0xFF0000, 1);
      graphics.drawCircle(300, 300, 100);
      // var videoSprite = this.phaser.add.sprite( window.innerWidth, window.innerHeight, this.videoBitmap );
    },

    create : function create(){

    },

    update : function update(){
      // console.log('>');
      // this.videoBitmap.context.drawImage(app.videoEl, 0, 0);
      var imageData = app.context.getImageData(0,0,window.innerWidth,window.innerHeight);
      this.videoBitmap.context.drawImage(imageData, 0, 0);

      app.takePic();
    }
  }
});