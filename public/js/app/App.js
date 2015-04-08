Class('App').inherits(Widget)({

  ELEMENT_CLASS : 'app',

  prototype : {

    socket : null,
    config : null,

    init : function(config){
      Widget.prototype.init.call(this, config);

      //start video stream
      navigator.webkitGetUserMedia({audio: true, video: true}, function(stream) {
        this.videoEl.src = window.URL.createObjectURL(stream);
        this.videoEl.play();
      }.bind(this), function(err){
        console.log('error: ', err);
      });

      this.appendChild(new PhaserWrapper({
        name : 'phaser',
        videoEl : this.videoEl
      }));

      this.videoEl = document.createElement('video');
      this.element.appendChild(this.videoEl);
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