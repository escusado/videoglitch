Class('App').inherits(Widget)({

  ELEMENT_CLASS : 'app',

  prototype : {

    socket : null,
    config : null,

    init : function(config){
      Widget.prototype.init.call(this, config);

      this.appendChild(new Widget({
        name : 'cameraCanvas',
        element : document.createElement('canvas')
      }));
      this.element.appendChild(this.cameraCanvas.element);
      this.context = this.cameraCanvas.element.getContext('2d');

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

    takePic : function takePic(){
      this.context.drawImage(this.videoEl, 0, 0, 200, 100);
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