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
      this.phaser.load.image('mypic', 'img/steven.png');
    },

    create : function create(){
      this.phaser.add.sprite(0, 0, 'mypic');
    },

    update : function update(){

    }
  }
});