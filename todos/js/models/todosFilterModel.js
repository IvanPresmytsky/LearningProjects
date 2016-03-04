applications.models.TodosFilterModel = (function TodosFilterModelModule () {

  function TodosFilterModel (filter) {
    this.filter = filter;
    this.listeners = {};
  }

  function on (obj, evt, callback) {
    if (!this.listeners.hasOwnProperty(evt)) {
      this.listeners[evt] = [];
    }
    this.listeners[evt].push(obj[callback].bind(obj));
  }

  function off (obj, evt, callback) {
    if (this.listeners.hasOwnProperty(evt)) {
      for (var i = 0; i < this.listeners[evt].length; i++) {
        if (this.listeners[evt][i] === obj[callback].bind(obj)) {
           this.listeners[evt].splice(i, 1);
        }
      }
    }
  }

  function trigger (evt) {
    if (this.listeners.hasOwnProperty(evt)) {
      for (var i = 0; i < this.listeners[evt].length; i++) {
        this.listeners[evt][i]();
      }
    }
  }


  function get() { return this.filter; }

  function set (filter) { 
    this.filter = filter;
    this.trigger('change');
  }


  TodosFilterModel.prototype.on = on;

  TodosFilterModel.prototype.off = off;

  TodosFilterModel.prototype.trigger = trigger;

  TodosFilterModel.prototype.get = get;

  TodosFilterModel.prototype.set = set;


  return TodosFilterModel;

})();