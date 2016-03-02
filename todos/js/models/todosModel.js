var applications = applications || {};

applications.models = applications.models || {};

applications.models.TodosModel = (function todosModelModule() {



  function TodosModel () {
    this.list = []; 
    this.listeners = {};
    this.newListItemId = this.list.length;
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
    this.trigger('reset', this.list, this.list.length); 
  }

  function getList () { return this.list; }

  function getNewListItemId () { return this.newListItemId; }

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
    this.trigger('add');
  }

  function remove (parameter, id) {
    this.list = this.list.filter(function deleteItem (item) {
      return item[parameter] != id; 
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

  
  TodosModel.prototype.on = on;

  TodosModel.prototype.off = off;

  TodosModel.prototype.trigger = trigger;

  TodosModel.prototype.reset = reset;
  
  TodosModel.prototype.getList = getList;

  TodosModel.prototype.getNewListItemId = getNewListItemId;

  TodosModel.prototype.getlistItem = getlistItem;

  TodosModel.prototype.add = add;

  TodosModel.prototype.remove = remove;

  TodosModel.prototype.filter = filter;

  TodosModel.prototype.containsCompleted = containsCompleted;


  return TodosModel;

})();


