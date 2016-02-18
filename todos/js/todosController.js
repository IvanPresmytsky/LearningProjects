(function (exports) {

  var todos = document.getElementById('todos-container');

  function clearDisplay () {
  	var display = document.getElementById('todos-display');
    display.value = null;
  }


  function todosReady () {
  	renderHeader();

  	var checkAllBtn = document.getElementById('checK-all-btn');
    var display = document.getElementById('todos-display');

    checkAllBtn.addEventListener('change', checkAllTodos, false);

    display.addEventListener('keyup', addItemToTodosList, false);

  	renderFiltredTodos(applications.todosModel.getList(), applications.todosModel.getFilter(), applications.todosModel.getList().length);
  }


  function renderHeader () {  
    var todosHeaderMarkup = applications.todosView.formTodosHeaderMarkup();
    
    todos.insertAdjacentHTML('afterBegin', todosHeaderMarkup);      
  }

  function renderFooter () {  
    var todosFooterMarkup = applications.todosView.formTodosFooterMarkup();
    
    todos.insertAdjacentHTML('beforeEnd', todosFooterMarkup);      
  }

  function renderTodosListContainer () {  
    var todosListMarkup = applications.todosView.formTodosListMarkup();
    
    todos.insertAdjacentHTML('beforeEnd', todosListMarkup);      
  }


  function renderTodosList (renderingList, itemCounter, isChecked) {
    var todosList = document.getElementById('list');
    var todosFooter = document.getElementById('footer');
    var checkAllBtn = document.getElementById('checK-all-btn');
    

    if (!todosList) {
      renderTodosListContainer();

      todosList = document.getElementById('list'); 

      todosList.addEventListener('change', checkTodosItem, false);

      todosList.addEventListener('keyup', editorFocusLoss, false);

      todosList.addEventListener('click', activateDelBtn, false);    	
    }
       
    todosList.innerHTML = '';
  
    for (var i = 0, l = renderingList.length; i < l; i++) {

      var todosItemMarkup = applications.todosView.formTodosItemMarkup(renderingList[i].id, renderingList[i].content, renderingList[i].state, renderingList[i].selection, renderingList[i].edition);

      todosList.insertAdjacentHTML('beforeEnd', todosItemMarkup);

      var todosEditor = todosList.getElementsByClassName('todos-item__edit-text')[i];
      var todosLabel = todosList.getElementsByClassName('todos-item__text')[i];

      todosLabel.addEventListener('dblclick', function editorFocus (event) {
        var target = event.target;
        var todosVisibleBlock = target.parentNode;
        var todosEditor = target.parentNode.nextElementSibling;

        todosEditor.classList.add('visible');
        todosVisibleBlock.classList.add('hidden');
        todosEditor.focus();
      }, false);

      todosEditor.addEventListener('blur', focusLost, true);

    }

      
    if (!todosFooter) {	
      renderFooter();

      todosFooter = document.getElementById('footer');

      todosFooter.addEventListener('click', activateFilter, false);

      todosFooter.addEventListener('click', activateDelAllCheckedBtn, false);
    }
    
    var todosItemCounter = document.getElementById('counter');
    var delAllCheckedTodos = document.getElementById('del-checked-items-btn'); 

    if (itemCounter === 0) {	      
      todosFooter.classList.remove('todos-footer--visible');
      checkAllBtn.classList.remove('todos-header__btn--visible');
    } else {     
      todosFooter.classList.add('todos-footer--visible');
      checkAllBtn.classList.add('todos-header__btn--visible');
      todosItemCounter.innerHTML = itemCounter;
    }
  
    if (isChecked) {
      delAllCheckedTodos.classList.add('todos-footer__del-btn--visible');
    } else {
      delAllCheckedTodos.classList.remove('todos-header__del-btn--visible');
    }
  }


  function renderFiltredTodos (renderingList, filter, itemCounter, isChecked) {
  	var todosFooter = document.getElementById('footer');

  	if (todosFooter) {
      var allFilter = document.getElementById('all-filter');
      var activeFilter = document.getElementById('active-filter');
      var completedFilter = document.getElementById('completed-filter');

      allFilter.classList.remove('todos-footer__filters--active');
      activeFilter.classList.remove('todos-footer__filters--active');
      completedFilter.classList.remove('todos-footer__filters--active');

      if (filter === 'All') {
        allFilter.classList.add('todos-footer__filters--active');
      } else if (filter === 'Active') {
        activeFilter.classList.add('todos-footer__filters--active');
      } else if (filter === 'Completed') {
        completedFilter.classList.add('todos-footer__filters--active');
      }
    }

    addItemToTodosList(renderingList, itemCounter, isChecked); 
  }


  function addItemToTodosList (event) {
    var targetValue = event.target.value;
    var enterKey = (event.keyCode === 13);

    if (enterKey && targetValue) {

      if (!((targetValue*1)&&(targetValue !== 0))) { return; }	 
      applications.todosModel.addToList(targetValue);
      clearDisplay();
      renderFiltredTodos(applications.todosModel.formFiltredList(), applications.todosModel.getFilter(), applications.todosModel.getList().length);  
    }
  }


  function checkTodosItem (event) {
    var target = event.target; 

    if (!target.classList.contains('todos-item__checkbox')) { return; }

    var todosItemId = target.parentNode.parentNode.id;
    var checkedTodosItem = applications.todosModel.getlistItem(todosItemId);
    if (target.checked) {    
      checkedTodosItem.state = 'Completed';
      checkedTodosItem.selection = true;
    } else {
      checkedTodosItem.state = 'Active';
      checkedTodosItem.selection = false;      
    }

    renderFiltredTodos(applications.todosModel.formFiltredList(), applications.todosModel.getFilter(), applications.todosModel.getList().length, applications.todosModel.checkingForCheckedTodos());
  }


  function checkAllTodos (event) {
  	var target = event.target;

    if (target.checked) {
      applications.todosModel.changeListItemsParameters('state', 'Completed');
      applications.todosModel.changeListItemsParameters('selection', true);
    } else {
      applications.todosModel.changeListItemsParameters('state', 'Active');
      applications.todosModel.changeListItemsParameters('selection', false);
    }

    renderFiltredTodos(applications.todosModel.formFiltredList(), applications.todosModel.getFilter(), applications.todosModel.getList().length, applications.todosModel.checkingForCheckedTodos());
  }


  function editorFocusLoss (event) {
    var target = event.target;
    var enterKey = (event.keyCode === 13);

    if (target.classList.contains('todos-item__edit-text') && enterKey && target.value) {
      target.blur();
    }
  } 


  function activateDelBtn (event) {
    var target = event.target;

    if (!target.classList.contains('del-current-todos-item')) { return; }

  	var todosId = target.parentNode.parentNode.id;
    
    applications.todosModel.deleteFromList('id', todosId);
    renderFiltredTodos(applications.todosModel.formFiltredList(), applications.todosModel.getFilter(), applications.todosModel.getList().length);
  }


  function activateDelAllCheckedBtn (event) {
    var target = event.target;

    if (target.id === 'del-checked-items-btn') {
      applications.todosModel.deleteFromList('state', 'Completed');
      renderFiltredTodos(applications.todosModel.formFiltredList(), applications.todosModel.getFilter(), applications.todosModel.getList().length, applications.todosModel.checkingForCheckedTodos());
    } 
  }


  function activateFilter (event) {
    var target = event.target;

    if (!target.classList.contains('todos-filter')) { return; }

    event.preventDefault();
    applications.todosModel.setFilter(target.innerHTML);
    renderFiltredTodos(applications.todosModel.formFiltredList(), applications.todosModel.getFilter(), applications.todosModel.getList().length, applications.todosModel.checkingForCheckedTodos());
  }


  function focusLost (event) {
    var target = event.target;
    var todosId = target.parentNode.id;
    var editedTodos = applications.todosModel.getlistItem(todosId);

    editedTodos.edition = false;
    editedTodos.content = target.value;
    renderFiltredTodos(applications.todosModel.formFiltredList(), applications.todosModel.getFilter(), applications.todosModel.getList().length, applications.todosModel.checkingForCheckedTodos()); 
  } 



  document.addEventListener('DOMContentLoaded', todosReady);

})(this.applications);




