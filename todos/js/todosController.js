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
    this.model.on('reset', render.bind(self));
    this.model.on('add', render.bind(self));
    this.model.on('remove', render.bind(self));
    this.filterModel.on('change', render.bind(self));
  }

  function render (todos) {

    if (!this.container) {

      var body = document.body;
      var todosContainerMarkup = applications.views.renderTodosContainer(this.id);

      body.insertAdjacentHTML('afterBegin', todosContainerMarkup);

      this.container = document.getElementById(this.id);
    }

    if (todos.filter) {
      var model = this.model;
      var renderedTodos = {
        filter: todos.filter,
        list: this.model.filter(todos.filter),
        counter: this.model.getList().length
      };
    } else {
      var renderedTodos = {
        list: todos.list,
        counter: todos.list.length
      };
    }
    

    this.renderFiltredTodos(renderedTodos);
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


  function renderTodosList (renderedTodos) {

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

    for (var i = 0, l = renderedTodos.list.length; i < l; i++) {

      var todosItemMarkup = applications.views.renderTodo(renderedTodos.list[i]);

      todosList.insertAdjacentHTML('beforeEnd', todosItemMarkup);

      var todosEditor = todosList.getElementsByClassName('todos-item__edit-text')[i];
      var todosLabel = todosList.getElementsByClassName('todos-item__text')[i];

      todosLabel.addEventListener('dblclick', editorFocus.bind(this), false);

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

    if (renderedTodos.counter === 0) {
      todosFooter.classList.remove('todos-footer--visible');
      checkAllBtn.classList.remove('todos-header__btn--visible');
    } else {
      todosFooter.classList.add('todos-footer--visible');
      checkAllBtn.classList.add('todos-header__btn--visible');
      todosItemCounter.innerHTML = renderedTodos.counter;
    }

    if (this.model.containsCompleted()) {
      delAllCheckedTodos.classList.add('todos-footer__del-btn--visible');
    } else {
      delAllCheckedTodos.classList.remove('todos-footer__del-btn--visible');
    }
  }


  function renderFiltredTodos (renderedTodos) {
    this.container = document.getElementById(this.id);
    var todosFooter = this.container.querySelector('#footer');

  if (todosFooter) {
      var allFilter = this.container.querySelector('#all-filter');
      var activeFilter = this.container.querySelector('#active-filter');
      var completedFilter = this.container.querySelector('#completed-filter');

      allFilter.classList.remove('todos-footer__filters--active');
      activeFilter.classList.remove('todos-footer__filters--active');
      completedFilter.classList.remove('todos-footer__filters--active');

      if (renderedTodos.filter === 'All') {
        allFilter.classList.add('todos-footer__filters--active');
      } else if (renderedTodos.filter === 'Active') {
        activeFilter.classList.add('todos-footer__filters--active');
      } else if (renderedTodos.filter === 'Completed') {
        completedFilter.classList.add('todos-footer__filters--active');
      }
    }

    this.renderTodosList(renderedTodos); 
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
  }


  function editorFocus (event) {
    var target = event.target;
    var editedTodoId = target.parentNode.parentNode.id;
    var todo = this.model.getlistItem(editedTodoId);

    target.parentNode.nextElementSibling.classList.add('visible');
    target.parentNode.classList.add('hidden');
    target.parentNode.nextElementSibling.focus();
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
    
    todo = this.model.getlistItem(todosId);
    todo.destroy();
  }


  function activateDelAllCheckedBtn (event) {
    var target = event.target;

    if (target.id !== 'del-checked-items-btn') { return; }
      var list = this.model.getList();
      for (var i = 0; i < list.length; i++) {
        if (list[i].state === 'Completed') {
          list[i].destroy();
        }
      }
  }


  function activateFilter (event) {
    var target = event.target;

    if (!target.classList.contains('todos-filter')) { return; }

    event.preventDefault();
    this.filterModel.set(target.innerHTML);
  }


  function focusLost (event) {
    var target = event.target;
    var todosId = target.parentNode.id;
    var editedTodos = this.model.getlistItem(todosId);

    if (target.value === "") {
      todo = this.model.getlistItem(todosId);
      todo.destroy();
    } else {
      editedTodos.set('content', target.value);
    }
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
  TodosController.prototype.editorFocus = editorFocus;
  TodosController.prototype.focusLost = focusLost;

  return TodosController;

})();