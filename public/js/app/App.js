Class('App').inherits(Widget)({

  ELEMENT_CLASS : 'app',

  prototype : {

    socket : null,
    config : null,

    init : function(config){
      Widget.prototype.init.call(this, config);

      this.appendChild(new PhaserWrapper({
        name : 'phaser'
      }));

    },

    setup : function setup(){
      this.phaser.render(this.element);
      this.phaser.setup();

      this._bindEvents();

      this.socket.emit('app_handshake_intent', {
        data : {
          clientId : this.config.clientId
        }
      });
    },

    _bindEvents : function _bindEvents(){
      this.socket.once('app_acknowledge-'+this.config.clientId, this._handlerAppAcknowledge.bind(this));
    },

    _handlerAppAcknowledge : function _handlerAppAcknowledge(ev){
      console.log('AppHandler session acknowledge', ev.data);
      console.log('Neonbootstrapped!');
    }
  }
});