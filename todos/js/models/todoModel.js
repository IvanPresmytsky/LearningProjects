
applications.models.TodoModel = (function todoModelModule() {

  function TodoModel (id, content) {
    this.id = id;
    this.content = content;
    this.state = 'Active';
    this.selection = false;
    this.edition = false;
    this.listeners = {};
  }

  function on (evt, callback) {
    if (!this.listeners.hasOwnProperty(evt)) {
      this.listeners[evt] = [];
    }
    this.listeners[evt].push(callback);
  }

  function off (evt, callback) {
    if (this.listeners.hasOwnProperty(evt)) {
      for (var i = 0; i < this.listeners[evt].length; i++) {
        if (this.listeners[evt][i] === callback) {
           this.listeners[evt].splice(i, 1);
        }
      }
    }
  }

  function trigger (evt, args) {
    if (this.listeners.hasOwnProperty(evt)) {
      for (var i = 0; i < this.listeners[evt].length; i++) {
        this.listeners[evt][i](args);
      }
    }
  }

  function destroy () {
    this.trigger('destroy', {parameter: 'id', id: this.id});
  }

  function get (prop) { return this.prop; }
    
  function set (prop, value) {
    this[prop] = value;
    this.trigger('change');
  }


  TodoModel.prototype.on = on;

  TodoModel.prototype.off = off;

  TodoModel.prototype.trigger = trigger;

  TodoModel.prototype.destroy = destroy;

  TodoModel.prototype.get = get;

  TodoModel.prototype.set = set;


  return TodoModel;
  
})();