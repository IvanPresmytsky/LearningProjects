(function (exports){
  var list = [{id: 1, state: "Active", selection: false, edition: false, content: "todo 1"}, 
              {id: 2, state: "Active", selection: false, edition: false, content: "todo 2"}];             
  var newListItemId = list.length;  
  var filter = 'All'; 
  
  exports.list = list;
  exports.filter = filter;
  exports.newListItemId = newListItemId;

  exports.getlistItem = function (id) {
  	var listItem = this.list.find( function (item) {
      return item.id == id;
  	});
  	return listItem;
  };

  exports.setFilter = function (filterValue) {
  	this.filter = filterValue;
  };

  exports.addToList = function (content) {
    newListItemId++;
    var newListItem = {
      id: newListItemId,
      state: 'Active',
      selection: false,
      edition: false,
      content: content  
    }
    this.list.push(newListItem);
  };

  exports.deleteFromList = function (parameter, id) {
    this.list = this.list.filter(function deleteItem (item) {
      return item[parameter] != id;	
    });
  };

  exports.formFiltredList = function () {
    var currentFilter = this.filter;
    if (currentFilter === 'All') {
      return this.list;
    } else {
      var filtredList = this.list.filter(function deleteItem (item) {
        return item.state === currentFilter;	
      });
      return filtredList;
    }
  };


  exports.checkingForCheckedTodos = function () {
    var checkboxChecked = this.list.some(function findingForCompletedState (item) {
      return item.state === 'Completed';
    });
    return checkboxChecked;
  };

  exports.changeListItemsParameters = function (param1, param2, param1Value, param2Value) {
    for (var i = 0; i < this.list.length; i++) {
      this.list[i][param1] = param1Value;
      this.list[i][param2] = param2Value;
    }         
  };


})(this.listModel = {});

