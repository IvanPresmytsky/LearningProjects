(function (exports) {

  var todos = document.getElementById('list-container');
  var display = document.getElementById('list-display');
  var checkAllBtn = document.getElementById('checK-all-btn');
  var todosList = document.getElementById('list');
  var delAllCheckedTodos = document.getElementById('del-checked-items-btn');
  var listFooter = document.getElementById('footer');
  

  function clearDisplay () {
    display.value = null;
  }


  function todosReady () {
  	renderTodos(applications.todosModel.getList(), applications.todosModel.getFilter(), applications.todosModel.getList().length);
  }


  function renderList (renderingList, itemCounter, isChecked) {
    todosList = document.getElementById('list');
    listFooter = document.getElementById('footer');

    var listItemCounter = document.getElementById('counter');

    todosList.innerHTML = '';
  
    for (var i = 0, l = renderingList.length; i < l; i++) {

      var listItemMarkup = applications.todosView.formTodosMarkup(renderingList[i].id, renderingList[i].content, renderingList[i].state, renderingList[i].selection, renderingList[i].edition);

      todosList.insertAdjacentHTML('beforeEnd', listItemMarkup);

      var todosEditor = todosList.getElementsByClassName('list-item__edit-text')[i];
      var todosLabel = todosList.getElementsByClassName('list-item__text')[i];

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

    if (itemCounter === 0) {
      listFooter.classList.remove('list-footer--visible');
      checkAllBtn.classList.remove('list-header__btn--visible');
    } else {
      listFooter.classList.add('list-footer--visible');
      checkAllBtn.classList.add('list-header__btn--visible');
      listItemCounter.innerHTML = itemCounter;
    }
  
    if (isChecked) {
      delAllCheckedTodos.classList.add('list-footer__del-btn--visible');
    } else {
      delAllCheckedTodos.classList.remove('list-header__del-btn--visible');
    }
  }


  function renderTodos (renderingList, filter, itemCounter, isChecked) {
    var allFilter = document.getElementById('all-filter');
    var activeFilter = document.getElementById('active-filter');
    var completedFilter = document.getElementById('completed-filter');

    allFilter.classList.remove('list-footer__filters--active');
    activeFilter.classList.remove('list-footer__filters--active');
    completedFilter.classList.remove('list-footer__filters--active');

    if (filter === 'All') {
      allFilter.classList.add('list-footer__filters--active');
    } else if (filter === 'Active') {
      activeFilter.classList.add('list-footer__filters--active');
    } else if (filter === 'Completed') {
      completedFilter.classList.add('list-footer__filters--active');
    }

    renderList(renderingList, itemCounter, isChecked); 
  }


  function enterKeyPressed (event) {
    var target = event.target;
    var enterKey = (event.keyCode === 13);
    
    if (target.id === 'list-display' && enterKey && target.value) {

     if (!((target.value*1)&&(target.value !== 0))) { return; }
      	 
      applications.todosModel.addToList(target.value);
      clearDisplay();
      renderTodos(applications.todosModel.formFiltredList(), applications.todosModel.getFilter(), applications.todosModel.getList().length);  
    }
  }


  function checkTodos (event) {
    var target = event.target; 

    if (!target.classList.contains('list-item__checkbox')) { return; }

    var todosId = target.parentNode.parentNode.id;
    var checkTodos = applications.todosModel.getlistItem(todosId);
    if (target.checked) {    
      checkTodos.state = 'Completed';
      checkTodos.selection = true;
    } else {
      checkTodos.state = 'Active';
      checkTodos.selection = false;      
    }

    renderTodos(applications.todosModel.formFiltredList(), applications.todosModel.getFilter(), applications.todosModel.getList().length, applications.todosModel.checkingForCheckedTodos());
  }


  function checkAllTodos (event) {
  	var target = event.target;

    if (target.checked) {
      applications.todosModel.changeListItemsParameters('state', 'selection', 'Completed', true);
    } else {
      applications.todosModel.changeListItemsParameters('state', 'selection', 'Active', false);
    }

    renderTodos(applications.todosModel.formFiltredList(), applications.todosModel.getFilter(), applications.todosModel.getList().length, applications.todosModel.checkingForCheckedTodos());
  }


  function editorFocusLoss (event) {
    var target = event.target;
    var enterKey = (event.keyCode === 13);

    if (target.classList.contains('list-item__edit-text') && enterKey && target.value) {
      target.blur();
    }
  } 


  function activateDelBtn (event) {
    var target = event.target;

    if (!target.classList.contains('del-current-list-item')) { return; }

  	var todosId = target.parentNode.parentNode.id;
    
    applications.todosModel.deleteFromList('id', todosId);
    renderTodos(applications.todosModel.formFiltredList(), applications.todosModel.getFilter(), applications.todosModel.getList().length);
  }


  function activateDelAllCheckedBtn (event) {
    var target = event.target;

    if (target.id === 'del-checked-items-btn') {
      applications.todosModel.deleteFromList('state', 'Completed');
      renderTodos(applications.todosModel.formFiltredList(), applications.todosModel.getFilter(), applications.todosModel.getList().length, applications.todosModel.checkingForCheckedTodos());
    } 
  }


  function activateFilter (event) {
    var target = event.target;

    if (!target.classList.contains('list-items-filter')) { return; }

    event.preventDefault();
    applications.todosModel.setFilter(target.innerHTML);
    renderTodos(applications.todosModel.formFiltredList(), applications.todosModel.getFilter(), applications.todosModel.getList().length, applications.todosModel.checkingForCheckedTodos());
  }


  function focusLost (event) {
    var target = event.target;
    var todosId = target.parentNode.id;
    var editedTodos = applications.todosModel.getlistItem(todosId);

    editedTodos.edition = false;
    editedTodos.content = target.value;
    renderTodos(applications.todosModel.formFiltredList(), applications.todosModel.getFilter(), applications.todosModel.getList().length, applications.todosModel.checkingForCheckedTodos()); 
  } 



  document.addEventListener('DOMContentLoaded', todosReady);

  todosList.addEventListener('change', checkTodos, false);

  checkAllBtn.addEventListener('change', checkAllTodos, false);

  todos.addEventListener('keyup', enterKeyPressed, false);

  todos.addEventListener('keyup', editorFocusLoss, false);

  todosList.addEventListener('click', activateDelBtn, false); 

  listFooter.addEventListener('click', activateFilter, false);

  listFooter.addEventListener('click', activateDelAllCheckedBtn, false);


})(this.applications);




