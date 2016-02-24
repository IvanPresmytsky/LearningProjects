var applications;
if(!applications) applications = {};
applications.models = {};

applications.models.TodosModel = (function listModelCreation() {

  function TodosModel () {
    this.list = [{id: 1, state: "Active", selection: false, edition: false, content: "todo 1"}, 
                {id: 2, state: "Active", selection: false, edition: false, content: "todo 2"}];             
    this.newListItemId = this.list.length;  
  }
  

  function getList () { return this.list; }

  function getNewListItemId () { return this.newListItemId; }

  function getlistItem (id) {
  	var listItem = this.list.find( function getListItemById (item) {
      return item.id == id;
  	});
  	return listItem;
  }
                       
  function addToList (content) {
    this.newListItemId++;
    var newListItem = new applications.models.TodosItemModel(this.newListItemId, content);
    this.list.push(newListItem);
  }

  function deleteFromList (parameter, id) {
    this.list = this.list.filter(function deleteItem (item) {
      return item[parameter] != id;	
    });
  }

  function getFiltredList (currentFilter) {
    if (currentFilter === 'All') {
      return this.list;
    } else {
      var filtredList = this.list.filter(function deleteItem (item) {
        return item.state === currentFilter;	
      });
      return filtredList;
    }
  }

  function checkingForCheckedTodos () {
    var checkboxChecked = this.list.some(function findingForCompletedState (item) {
      return item.state === 'Completed';
    });
    return checkboxChecked;
  }

  function changeListItemsParameters (param, paramValue) {
    for (var i = 0; i < this.list.length; i++) {
      this.list[i][param] = paramValue;
    }         
  } 



  
  TodosModel.prototype.getList = getList;

  TodosModel.prototype.getNewListItemId = getNewListItemId;

  TodosModel.prototype.getlistItem = getlistItem;
                      
  TodosModel.prototype.addToList = addToList;

  TodosModel.prototype.deleteFromList = deleteFromList;

  TodosModel.prototype.getFiltredList = getFiltredList;

  TodosModel.prototype.checkingForCheckedTodos = checkingForCheckedTodos;

  TodosModel.prototype.changeListItemsParameters = changeListItemsParameters;


  return TodosModel;
  
})();


