var applications = applications || {};

applications.models = {};

applications.models.TodosModel = (function todosModelModule() {

  function TodosModel () {
    this.list = [];             
    this.newListItemId = this.list.length;  
  }

  function setDefaultTodo (todo) {
    this.list.push(todo);
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
  }

  function remove (parameter, id) {
    this.list = this.list.filter(function deleteItem (item) {
      return item[parameter] != id; 
    });
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
  /*
  function changeListItemsParameters (param, paramValue) {
    for (var i = 0; i < this.list.length; i++) {
      this.list[i][param] = paramValue;
    }         
  } 
*/

  TodosModel.prototype.setDefaultTodo = setDefaultTodo;
  
  TodosModel.prototype.getList = getList;

  TodosModel.prototype.getNewListItemId = getNewListItemId;

  TodosModel.prototype.getlistItem = getlistItem;
                      
  TodosModel.prototype.add = add;

  TodosModel.prototype.remove = remove;

  TodosModel.prototype.filter = filter;

  TodosModel.prototype.containsCompleted = containsCompleted;

  //TodosModel.prototype.changeListItemsParameters = changeListItemsParameters;


  return TodosModel;
  
})();


