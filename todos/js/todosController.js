applications.controllers = applications.controllers || {};
applications.controllers.TodosController = (function todosControllerModule() {


  function TodosController(model, filterModel, id) {
    this.container = document.getElementById(this.id);
    this.model = model;
    this.filterModel = filterModel; 
    this.id = id;
  }

  function subscribe () {
    var self = this;
    this.model.on(self, 'reset', 'render');
    this.model.on(self, 'add', 'render');
    this.model.on(self, 'remove', 'render');
  }

  function render () {
    if (!this.container) {

      var body = document.body;
      var todosContainerMarkup = applications.views.renderTodosContainer(this.id);

      body.insertAdjacentHTML('afterBegin', todosContainerMarkup);

      this.container = document.getElementById(this.id);
    }

    this.renderFiltredTodos(this.model.getList(), this.filterModel.get(), this.model.getList().length);
  }

  function clearDisplay () {
    var display = this.container.querySelector('#todos-display');
    display.value = null;
  }

  function renderHeader () {
    this.todos = this.container.querySelector('.todos-container');
    var todosHeaderMarkup = applications.views.renderTodosHeader();

    this.todos.insertAdjacentHTML('afterBegin', todosHeaderMarkup);
  }


  function renderFooter () {
    var todosFooterMarkup = applications.views.renderTodosFooter();

    this.todos.insertAdjacentHTML('beforeEnd', todosFooterMarkup);
  }


  function renderTodosListContainer () {
    var todosListMarkup = applications.views.renderTodosList();

    this.todos.insertAdjacentHTML('beforeEnd', todosListMarkup);
  }


  function renderTodosList (renderingList, itemCounter) {

    var todosList = this.container.querySelector('#list');
    var todosFooter = this.container.querySelector('#footer');
    var todosHeader = this.container.querySelector('#header');
    var checkAllBtn = this.container.querySelector('#check-all-btn');

   if (!todosHeader) {
      this.renderHeader();
      var display = this.container.querySelector('#todos-display');

      checkAllBtn = this.container.querySelector('#check-all-btn');

      checkAllBtn.addEventListener('change', checkAllTodos.bind(this), false);

      display.addEventListener('keyup', addItemToTodosList.bind(this), false);  
    }


    if (!todosList) {
      this.renderTodosListContainer();

      todosList = this.container.querySelector('#list'); 

      todosList.addEventListener('change', checkTodosItem.bind(this), false);

      todosList.addEventListener('keyup', editorFocusLoss.bind(this), false);

      todosList.addEventListener('click', activateDelBtn.bind(this), false);
    }

    todosList.innerHTML = '';

    for (var i = 0, l = renderingList.length; i < l; i++) {

      var todosItemMarkup = applications.views.renderTodo(renderingList[i].id, renderingList[i].content, renderingList[i].state, renderingList[i].selection, renderingList[i].edition);

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
      this.renderFooter();

      todosFooter = this.container.querySelector('#footer');

      todosFooter.addEventListener('click', activateFilter.bind(this), false);

      todosFooter.addEventListener('click', activateDelAllCheckedBtn.bind(this), false);
    }

    var todosItemCounter = this.container.querySelector('#counter');
    var delAllCheckedTodos = this.container.querySelector('#del-checked-items-btn'); 

    if (itemCounter === 0) {
      todosFooter.classList.remove('todos-footer--visible');
      checkAllBtn.classList.remove('todos-header__btn--visible');
    } else {
      todosFooter.classList.add('todos-footer--visible');
      checkAllBtn.classList.add('todos-header__btn--visible');
      todosItemCounter.innerHTML = itemCounter;
    }

    if (this.model.containsCompleted()) {
      delAllCheckedTodos.classList.add('todos-footer__del-btn--visible');
    } else {
      delAllCheckedTodos.classList.remove('todos-footer__del-btn--visible');
    }
  }


  function renderFiltredTodos (renderingList, filter, itemCounter) {
    this.container = document.getElementById(this.id);
    var todosFooter = this.container.querySelector('footer');

  if (todosFooter) {
      var allFilter = this.container.querySelector('all-filter');
      var activeFilter = this.container.querySelector('active-filter');
      var completedFilter = this.container.querySelector('completed-filter');

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
    if (enterKey && (targetValue.search(/\S/) === -1)) {
      this.clearDisplay(); 
      return; 
    }
    if (enterKey && targetValue) {
      this.model.add(targetValue);
      this.clearDisplay(); 
    }
  }


  function checkTodosItem (event) {
    var target = event.target; 
    var checkAllBtn = this.container.querySelector('#check-all-btn');

    if (!target.classList.contains('todos-item__checkbox')) { return; }

    var todosItemId = target.parentNode.parentNode.id;
    var checkedTodosItem = this.model.getlistItem(todosItemId);

    if (target.checked) {    
      checkedTodosItem.set('state', 'Completed');
      checkedTodosItem.set('selection', true);
    } else {
      checkedTodosItem.set('state', 'Active');
      checkedTodosItem.set('selection', false);
    }

    if (target.checked === false && checkAllBtn.checked) {
      checkAllBtn.checked = false;
    }

    this.renderFiltredTodos(this.model.filter(this.filterModel.get()), this.filterModel.get(), this.model.getList().length);
  }


  function checkAllTodos (event) {
    var target = event.target;
    var list = this.model.getList();
    if (target.checked) {
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        item.set('state', 'Completed');
        item.set('selection', true);
      } 
    } else {
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        item.set('state', 'Active');
        item.set('selection', false);
      }
    }
    
    this.renderFiltredTodos(this.model.filter(this.filterModel.get()), this.filterModel.get(), this.model.getList().length);
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
    
    this.model.remove('id', todosId);
  }


  function activateDelAllCheckedBtn (event) {
    var target = event.target;

    if (target.id === 'del-checked-items-btn') {
      this.model.remove('state', 'Completed');
    }
  }


  function activateFilter (event) {
    var target = event.target;

    if (!target.classList.contains('todos-filter')) { return; }

    event.preventDefault();
    this.filterModel.set(target.innerHTML);
    this.renderFiltredTodos(this.model.filter(this.filterModel.get()), this.filterModel.get(), this.model.getList().length);
  }


  function focusLost (event) {
    var target = event.target;
    var todosId = target.parentNode.id;
    var editedTodos = this.model.getlistItem(todosId);

    editedTodos.edition = false;

    if (target.value === "") {
      this.model.remove('id', todosId);
    } else {
      editedTodos.content = target.value;
    }
    
    this.renderFiltredTodos(this.model.filter(this.filterModel.get()), this.filterModel.get(), this.model.getList().length); 
  }

  TodosController.prototype.subscribe = subscribe;
  TodosController.prototype.clearDisplay = clearDisplay;
  TodosController.prototype.render = render;
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