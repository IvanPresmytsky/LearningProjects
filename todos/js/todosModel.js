var applications = {};

(function (exports){

  var list = [{id: 1, state: "Active", selection: false, edition: false, content: "todo 1"}, 
              {id: 2, state: "Active", selection: false, edition: false, content: "todo 2"}];             
  var newListItemId = list.length;  
  var filter = 'All';



  function getList () { return list; }

  function getFilter() { return filter; }

  function getNewListItemId () { return newListItemId; }

  function getlistItem (id) {
  	var listItem = list.find( function getListItemById (item) {
      return item.id == id;
  	});
  	return listItem;
  }

  function setFilter (filterValue) {
  	filter = filterValue;
  }
                       
  function addToList (content) {
    newListItemId++;
    var newListItem = {
      id: newListItemId,
      state: 'Active',
      selection: false,
      edition: false,
      content: content  
    }
    list.push(newListItem);
  }

  function deleteFromList (parameter, id) {
    list = list.filter(function deleteItem (item) {
      return item[parameter] != id;	
    });
  }

  function formFiltredList () {
    var currentFilter = filter;
    if (currentFilter === 'All') {
      return list;
    } else {
      var filtredList = list.filter(function deleteItem (item) {
        return item.state === currentFilter;	
      });
      return filtredList;
    }
  }

  function checkingForCheckedTodos () {
    var checkboxChecked = list.some(function findingForCompletedState (item) {
      return item.state === 'Completed';
    });
    return checkboxChecked;
  }

  function changeListItemsParameters (param, paramValue) {
    for (var i = 0; i < list.length; i++) {
      list[i][param] = paramValue;
    }         
  } 



  exports.todosModel = {

  	getList: getList,

  	getFilter: getFilter,

  	getNewListItemId: getNewListItemId,

    getlistItem: getlistItem,

  	setFilter: setFilter,
                       
    addToList: addToList,

    deleteFromList: deleteFromList,

    formFiltredList: formFiltredList,

    checkingForCheckedTodos: checkingForCheckedTodos,

    changeListItemsParameters: changeListItemsParameters

  };
  
})(this.applications);

