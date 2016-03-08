var applications = applications || {};

applications.models = applications.models || {};

applications.mixins = applications.mixins || {};


applications.mixins.eventMixin = {
  on: function (event, callback) {
    if(!this.listeners) { this.listeners = {}; }

    if (!this.listeners.hasOwnProperty(event)) {
       this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  },

  off: function off (evt, callback) {
    if (this.listeners.hasOwnProperty(event)) {
      for (var i = 0; i < this.listeners[event].length; i++) {
        if (this.listeners[event][i] === callback) {
           this.listeners[event].splice(i, 1);
        }
      }
    }
  },

  trigger: function trigger (event, args) {
    if (this.listeners && this.listeners.hasOwnProperty(event)) {
      for (var i = 0; i < this.listeners[event].length; i++) {
        this.listeners[event][i](args);
      }
    }
  }

};