(function (exports) {

  exports.controller = {

    ready: function () {
  	         applications.viewModel.renderTodos(applications.listModel.getList(), applications.listModel.getFilter(), applications.listModel.getList().length);
           },

    enterKeyPressed: function (event) {
                       var target = event.target;
                       var enterKey = (event.keyCode === 13);
                       if (target.id === 'list-display' && enterKey && target.value) {

      	                 if (!((target.value*1)&&(target.value !== 0))) { return; }
      	 
                         applications.listModel.addToList(target.value);
                         applications.viewModel.clearDisplay();
                         applications.viewModel.renderTodos(applications.listModel.formFiltredList(), applications.listModel.getFilter(), applications.listModel.getList().length);  
                       }
                     },

    activateDelBtn: function (event) {
                      var target = event.target;

                      if (!target.classList.contains('del-current-list-item')) { return; }

  	                  var todosId = target.parentNode.parentNode.id;
    
                      applications.listModel.deleteFromList('id', todosId);
                      applications.viewModel.renderTodos(applications.listModel.formFiltredList(), applications.listModel.getFilter(), applications.listModel.getList().length);
                    },

    checkTodos: function (event) {
                  var target = event.target; 

                  if (!target.classList.contains('list-item__checkbox')) { return; }

                  var todosId = target.parentNode.parentNode.id;
                  var checkTodos = applications.listModel.getlistItem(todosId);
                  if (target.checked) {    
                    checkTodos.state = 'Completed';
                    checkTodos.selection = true;
                  } else {
                    checkTodos.state = 'Active';
                    checkTodos.selection = false;      
                  }
                  applications.viewModel.renderTodos(applications.listModel.formFiltredList(), applications.listModel.getFilter(), applications.listModel.getList().length, applications.listModel.checkingForCheckedTodos());
                },

    checkAllTodos: function (event) {
  	                 var target = event.target;
                     if (target.checked) {
                       applications.listModel.changeListItemsParameters('state', 'selection', 'Completed', true);
                     } else {
                       applications.listModel.changeListItemsParameters('state', 'selection', 'Active', false);
                     }
                       applications.viewModel.renderTodos(applications.listModel.formFiltredList(), applications.listModel.getFilter(), applications.listModel.getList().length, applications.listModel.checkingForCheckedTodos());
                   },

    activateDelAllCheckedBtn: function (event) {
                                var target = event.target;
                                if (target.id === 'del-checked-items-btn') {
                                  applications.listModel.deleteFromList('state', 'Completed');
                                  applications.viewModel.renderTodos(applications.listModel.formFiltredList(), applications.listModel.getFilter(), applications.listModel.getList().length, applications.listModel.checkingForCheckedTodos());
                                } 
                              },

    activateFilter: function (event) {
                      var target = event.target;

                      if (!target.classList.contains('list-items-filter')) { return; }

                      event.preventDefault();
                      applications.listModel.setFilter(target.innerHTML);
                      applications.viewModel.renderTodos(applications.listModel.formFiltredList(), applications.listModel.getFilter(), applications.listModel.getList().length, applications.listModel.checkingForCheckedTodos());
                    }, 

    focusLost: function(event) {
                 var target = event.target;
                 var todosId = target.parentNode.id;
                 var editedTodos = applications.listModel.getlistItem(todosId);
                 editedTodos.edition = false;
                 editedTodos.content = target.value;
                 applications.viewModel.renderTodos(applications.listModel.formFiltredList(), applications.listModel.getFilter(), applications.listModel.getList().length, applications.listModel.checkingForCheckedTodos()); 
               }
                                                                                      
  };

})(this.applications);




