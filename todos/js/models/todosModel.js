var applications = applications || {};

applications.models = applications.models || {};

applications.models.TodosModel = (function todosModelModule() {



  function TodosModel () {
    this.list = []; 
    this.listeners = {};
    this.newListItemId = this.list.length;
  }


  function subscribe (todo) {
    todo.on(this, 'destroy', 'remove');
    todo.on(this, 'change', 'todoChange');
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

  function reset (list) {
    this.list = list;

    for (var i = 0; i < this.list.length; i++) {
      var item = this.list[i];
      this.subscribe(item);
    }

    this.trigger('reset', this.list, this.list.length); 
  }

  function getList () { return this.list; }

  //function getNewListItemId () { return this.newListItemId; }

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
    this.trigger('add');
  }

  function remove (todo) {
    this.list = this.list.filter(function deleteItem (item) {
      return item[todo.parameter] != todo.id; 
    });
    this.trigger('remove');
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
    console.log(this.list);
  }


  TodosModel.prototype.subscribe = subscribe;
  
  TodosModel.prototype.on = on;

  TodosModel.prototype.off = off;

  TodosModel.prototype.trigger = trigger;

  TodosModel.prototype.todoChange = todoChange;

  TodosModel.prototype.reset = reset;
  
  TodosModel.prototype.getList = getList;

  //TodosModel.prototype.getNewListItemId = getNewListItemId;

  TodosModel.prototype.getlistItem = getlistItem;

  TodosModel.prototype.add = add;

  TodosModel.prototype.remove = remove;

  TodosModel.prototype.filter = filter;

  TodosModel.prototype.containsCompleted = containsCompleted;


  return TodosModel;

})();


