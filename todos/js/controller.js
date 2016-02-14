(function (exports) { 

  exports.ready = function () {
  	console.log('ready');
  	viewModel.renderTodos(listModel.list, listModel.filter, listModel.list.length);
  };

  exports.enterKeyPressed = function (event) {
    var target = event.target;
    var enterKey = (event.keyCode === 13);
      if (target.id === 'list-display' && enterKey && target.value) {
      	if (!((target.value*1)&&(target.value !== 0))) {
      	  return;
      	}
        listModel.addToList(target.value);
        viewModel.clearDisplay();
        viewModel.renderTodos(listModel.formFiltredList(), listModel.filter, listModel.list.length);  
      }
  };

  exports.activateDelBtn = function (event) {
    var target = event.target;
    if (!target.classList.contains('del-current-list-item')) {return;}
  	var todosId = target.parentNode.parentNode.id;
    
    listModel.deleteFromList('id', todosId);
    viewModel.renderTodos(listModel.formFiltredList(), listModel.filter, listModel.list.length);
  };

  exports.checkTodos = function (event) {
    var target = event.target; 	
    if (!target.classList.contains('list-item__checkbox')) {return;}
    var todosId = target.parentNode.parentNode.id;

    var checkTodos = listModel.getlistItem(todosId);
    if (target.checked) {    
      checkTodos.state = 'Completed';
      checkTodos.selection = true;
    } else {
      checkTodos.state = 'Active';
      checkTodos.selection = false;      
    }
    viewModel.renderTodos(listModel.formFiltredList(), listModel.filter, listModel.list.length, listModel.checkingForCheckedTodos());
  };

  exports.checkAllTodos = function (event) {
  	var target = event.target;
    if (target.checked) {
      listModel.changeListItemsParameters('state', 'selection', 'Completed', true);
    } else {
      listModel.changeListItemsParameters('state', 'selection', 'Active', false);
    }
    viewModel.renderTodos(listModel.formFiltredList(), listModel.filter, listModel.list.length, listModel.checkingForCheckedTodos());
  };

  exports.activateDelAllCheckedBtn = function (event) {
    var target = event.target;
    if (target.id === 'del-checked-items-btn') {
      listModel.deleteFromList('state', 'Completed');
      viewModel.renderTodos(listModel.formFiltredList(), listModel.filter, listModel.list.length, listModel.checkingForCheckedTodos());
    } 
  };

  exports.activateFilter = function (event) {
    var target = event.target;
    console.log(target);
    if (!target.classList.contains('list-items-filter')){return;}
      event.preventDefault();
      listModel.setFilter(target.innerHTML);
      viewModel.renderTodos(listModel.formFiltredList(), listModel.filter, listModel.list.length, listModel.checkingForCheckedTodos());
  };
/*
  exports.activateTodosEditor = function(event) {
    var target = event.target;   
    var todosId = target.parentNode.parentNode.id;
    var editor = target.parentNode.nextElementSibling;
    var editedTodos = listModel.getlistItem(todosId);
    editedTodos.edition = true;
    editor.focus();
    viewModel.renderTodos(listModel.formFiltredList(), listModel.filter, listModel.list.length, listModel.checkingForCheckedTodos());
  };
*/
  exports.focusLost = function(event) {
    var target = event.target;
    var todosId = target.parentNode.id;
    var editedTodos = listModel.getlistItem(todosId);
    editedTodos.edition = false;
    editedTodos.content = target.value;
    viewModel.renderTodos(listModel.formFiltredList(), listModel.filter, listModel.list.length, listModel.checkingForCheckedTodos()); 
  };

})(this.controller = {});




