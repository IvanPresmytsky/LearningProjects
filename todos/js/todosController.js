applications.controllers = {};

applications.controllers.TodosController = (function todosControllerCreating() {

  var todos = document.getElementById('todos-container');

  function TodosController(model) {
    this.model = model;   
  }


  function clearDisplay () {
  	var display = document.getElementById('todos-display');
    display.value = null;
  }


  function todosReady () {
  	renderHeader();

  	var checkAllBtn = document.getElementById('checK-all-btn');
    var display = document.getElementById('todos-display');

    checkAllBtn.addEventListener('change', checkAllTodos.bind(this), false);

    display.addEventListener('keyup', addItemToTodosList.bind(this), false);

    this.renderFiltredTodos(this.model.getList(), this.model.getFilter(), this.model.getList().length);
  }


  function renderHeader () {  
    var todosHeaderMarkup = applications.todosHeaderView.renderTodosHeader();
    
    todos.insertAdjacentHTML('afterBegin', todosHeaderMarkup);      
  }


  function renderFooter () {  
    var todosFooterMarkup = applications.todosFooterView.renderTodosFooter();
    
    todos.insertAdjacentHTML('beforeEnd', todosFooterMarkup);      
  }


  function renderTodosListContainer () {  
    var todosListMarkup = applications.todosListView.renderTodosList();
    
    todos.insertAdjacentHTML('beforeEnd', todosListMarkup);      
  }


  function renderTodosList (renderingList, itemCounter) {
    var todosList = document.getElementById('list');
    var todosFooter = document.getElementById('footer');
    var checkAllBtn = document.getElementById('checK-all-btn');
    

    if (!todosList) {
      renderTodosListContainer();

      todosList = document.getElementById('list'); 

      todosList.addEventListener('change', checkTodosItem.bind(this), false);

      todosList.addEventListener('keyup', editorFocusLoss.bind(this), false);

      todosList.addEventListener('click', activateDelBtn.bind(this), false);    	
    }
    
       
    todosList.innerHTML = '';
  
    for (var i = 0, l = renderingList.length; i < l; i++) {

      var todosItemMarkup = applications.todosItemView.renderTodosItem(renderingList[i].id, renderingList[i].content, renderingList[i].state, renderingList[i].selection, renderingList[i].edition);

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

      todosEditor.addEventListener('blur', focusLost.bind(this), true);

    }

      
    if (!todosFooter) {	
      renderFooter();

      todosFooter = document.getElementById('footer');

      todosFooter.addEventListener('click', activateFilter.bind(this), false);

      todosFooter.addEventListener('click', activateDelAllCheckedBtn.bind(this), false);
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
  
    if (this.model.checkingForCheckedTodos()) {
      delAllCheckedTodos.classList.add('todos-footer__del-btn--visible');
    } else {
      delAllCheckedTodos.classList.remove('todos-header__del-btn--visible');
    }
  }


  function renderFiltredTodos (renderingList, filter, itemCounter) {
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

    this.renderTodosList(renderingList, itemCounter); 
  }


  function addItemToTodosList (event) {

    var targetValue = event.target.value;
    var enterKey = (event.keyCode === 13);

    if (enterKey && targetValue) {

      if (!((targetValue*1)&&(targetValue !== 0))) { return; }
      this.model.addToList(targetValue);
      clearDisplay();
      this.renderFiltredTodos(this.model.formFiltredList(), this.model.getFilter(), this.model.getList().length);  
    }
  }


  function checkTodosItem (event) {
    var target = event.target; 

    if (!target.classList.contains('todos-item__checkbox')) { return; }

    var todosItemId = target.parentNode.parentNode.id;
    var checkedTodosItem = this.model.getlistItem(todosItemId);
    if (target.checked) {    
      checkedTodosItem.state = 'Completed';
      checkedTodosItem.selection = true;
    } else {
      checkedTodosItem.state = 'Active';
      checkedTodosItem.selection = false;      
    }

    this.renderFiltredTodos(this.model.formFiltredList(), this.model.getFilter(), this.model.getList().length);
  }


  function checkAllTodos (event) {
  	var target = event.target;

    if (target.checked) {
      this.model.changeListItemsParameters('state', 'Completed');
      this.model.changeListItemsParameters('selection', true);
    } else {
      this.model.changeListItemsParameters('state', 'Active');
      this.model.changeListItemsParameters('selection', false);
    }

    this.renderFiltredTodos(this.model.formFiltredList(), this.model.getFilter(), this.model.getList().length);
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
    
    this.model.deleteFromList('id', todosId);
    this.renderFiltredTodos(this.model.formFiltredList(), this.model.getFilter(), this.model.getList().length);
  }


  function activateDelAllCheckedBtn (event) {
    var target = event.target;

    if (target.id === 'del-checked-items-btn') {
      this.model.deleteFromList('state', 'Completed');
      this.renderFiltredTodos(this.model.formFiltredList(), this.model.getFilter(), this.model.getList().length);
    } 
  }


  function activateFilter (event) {
    var target = event.target;

    if (!target.classList.contains('todos-filter')) { return; }

    event.preventDefault();
    this.model.setFilter(target.innerHTML);
    this.renderFiltredTodos(this.model.formFiltredList(), this.model.getFilter(), this.model.getList().length);
  }


  function focusLost (event) {
    var target = event.target;
    var todosId = target.parentNode.id;
    var editedTodos = this.model.getlistItem(todosId);

    editedTodos.edition = false;
    editedTodos.content = target.value;
    this.renderFiltredTodos(this.model.formFiltredList(), this.model.getFilter(), this.model.getList().length); 
  } 


  TodosController.prototype.clearDisplay = clearDisplay;
  TodosController.prototype.todosReady = todosReady;
  TodosController.prototype.renderHeader = renderHeader;
  TodosController.prototype.renderFooter = renderFooter;
  TodosController.prototype.renderTodosListContainer = renderTodosListContainer;
  TodosController.prototype.renderTodosList = renderTodosList;
  TodosController.prototype.renderFiltredTodos = renderFiltredTodos;
  TodosController.prototype.addItemToTodosList = addItemToTodosList;
  TodosController.prototype.checkTodosItem = checkTodosItem;
  TodosController.prototype.checkAllTodos = checkAllTodos;
  TodosController.prototype.editorFocusLoss = editorFocusLoss;
  TodosController.prototype.activateDelBtn = activateDelBtn;
  TodosController.prototype.activateDelAllCheckedBtn = activateDelAllCheckedBtn;
  TodosController.prototype.activateFilter = activateFilter;
  TodosController.prototype.focusLost = focusLost;

  return TodosController;

})();
