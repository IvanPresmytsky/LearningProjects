var applications;
if(!applications) applications = {};
applications.models = {};

applications.models.TodosModel = (function listModelCreation() {

  function TodosModel () {
    this.list = [{id: 1, state: "Active", selection: false, edition: false, content: "todo 1"}, 
                {id: 2, state: "Active", selection: false, edition: false, content: "todo 2"}];             
    this.newListItemId = this.list.length;  
    this.filter = 'All';
  }
  



  function getList () { return this.list; }

  function getFilter() { return this.filter; }

  function getNewListItemId () { return this.newListItemId; }

  function getlistItem (id) {
  	var listItem = this.list.find( function getListItemById (item) {
      return item.id == id;
  	});
  	return listItem;
  }

  function setFilter (filterValue) {
  	this.filter = filterValue;
  }
                       
  function addToList (content) {
    this.newListItemId++;
    var newListItem = {
      id: this.newListItemId,
      state: 'Active',
      selection: false,
      edition: false,
      content: content  
    }
    this.list.push(newListItem);
  }

  function deleteFromList (parameter, id) {
    this.list = this.list.filter(function deleteItem (item) {
      return item[parameter] != id;	
    });
  }

  function formFiltredList () {
    var currentFilter = this.filter;
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

  TodosModel.prototype.getFilter = getFilter;

  TodosModel.prototype.getNewListItemId = getNewListItemId;

  TodosModel.prototype.getlistItem = getlistItem;

  TodosModel.prototype.setFilter = setFilter;
                       
  TodosModel.prototype.addToList = addToList;

  TodosModel.prototype.deleteFromList = deleteFromList;

  TodosModel.prototype.formFiltredList = formFiltredList;

  TodosModel.prototype.checkingForCheckedTodos = checkingForCheckedTodos;

  TodosModel.prototype.changeListItemsParameters = changeListItemsParameters;


  return TodosModel;
  
})();


