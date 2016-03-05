var applications = applications || {};

applications.models = applications.models || {};


applications.eventMixin = {
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




applications.models.TodosModel = (function todosModelModule() {


  function TodosModel () {
    this.list = []; 
    this.newListItemId = this.list.length;
  }


  function subscribe (todo) {
    todo.on('destroy', remove.bind(this));
    todo.on('change', todoChange.bind(this));
  }

  function reset (list) {
    this.list = list;
    for (var i = 0; i < this.list.length; i++) {
      var item = this.list[i];
      this.subscribe(item);
    }
    
    this.trigger('reset', {list: this.list}); 
  }

  function getList () { return this.list; }


  function getlistItem (id) {
    return this.list.find( function getListItemById (item) {
      return item.id == id;
    });
  }

  function add (content) {
    this.newListItemId++;

    if (this.getlistItem(this.newListItemId) !== "undefinded") {
      var newListItem = new applications.models.TodoModel((this.newListItemId + 10000), content);
    } else {
      var newListItem = new applications.models.TodoModel(this.newListItemId, content);
    }

    this.list.push(newListItem);
    this.subscribe(newListItem);
    this.trigger('add', {list: this.list});
  }

  function remove (todo) {
    this.list = this.list.filter(function deleteItem (item) {
      return item[todo.parameter] != todo.id; 
    });
    this.trigger('remove', {list: this.list});
  }

  function filter (currentFilter) {
    if (currentFilter === 'All') {
      return this.list;
    } else {
      return this.list.filter(function filterList (item) {
        return item.state === currentFilter;  
      });
    }
  }

  function containsCompleted () {
    return this.list.some(function containsCompletedState (item) {
      return item.state === 'Completed';
    });
  }

  function todoChange () {
    this.trigger('reset', {list: this.list}); 
  }


  TodosModel.prototype.subscribe = subscribe;
  
  TodosModel.prototype.on = applications.eventMixin.on;

  TodosModel.prototype.off = applications.eventMixin.off;

  TodosModel.prototype.trigger = applications.eventMixin.trigger;

  TodosModel.prototype.todoChange = todoChange;

  TodosModel.prototype.reset = reset;
  
  TodosModel.prototype.getList = getList;

  TodosModel.prototype.getlistItem = getlistItem;

  TodosModel.prototype.add = add;

  TodosModel.prototype.remove = remove;

  TodosModel.prototype.filter = filter;

  TodosModel.prototype.containsCompleted = containsCompleted;


  return TodosModel;

})();


