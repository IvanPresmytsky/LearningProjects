//applications.controllers = applications.controllers || {};

applications.controllers.TodosListController = (function todosListControllerModule() {

  function TodosListController(model, filterModel, id) {
    var todosHeader = document.getElementById('todosHeaderTemplate').innerHTML;
    var todosFooter = document.getElementById('todosFooterTemplate').innerHTML;
    var todosList = document.getElementById('todosListTemplate').innerHTML;

    this.model = model;
    this.filterModel = filterModel;
    this.id = id;

    this.elem = {}; 
    this.headerTemplate = Handlebars.compile(todosHeader);
    this.footerTemplate = Handlebars.compile(todosFooter);
    this.listTemplate = Handlebars.compile(todosList);

    this.subscribe();
  }


  function subscribe () {
    this.model.on('reset', render.bind(this));
    this.model.on('add', render.bind(this));
    this.model.on('remove', render.bind(this));
    this.model.on('itemChange', renderCheckAllBtn.bind(this));
    this.filterModel.on('change', render.bind(this));
  }

  function unsubscribe () {
    this.model.off('reset', render.bind(this));
    this.model.off('add', render.bind(this));
    this.model.off('remove', render.bind(this));
    this.model.off('itemChange', renderCheckAllBtn.bind(this));
    this.filterModel.off('change', render.bind(this));
  }

  function render (todos) {
    this.isContainerRendered(todos);
    this.renderFooter();
    this.isCounterEqualsNull(todos);
    this.defindListAPI(todos);
    this.renderFilters(todos);
  }

  function isContainerRendered (todos) {
    if(!this.container) {
      this.container = document.getElementById(this.id);
      this.todos = this.container.querySelector('.todos-container');
      this.renderHeader();
      this.renderTodosListContainer();
    }
  }

  function isCounterEqualsNull (todos) {
    if (this.header && todos.counter === 0) {
      this.checkAllBtn.classList.remove('todos-header__btn--visible');
      this.unsubscribeFooterElements();
      this.todos.removeChild(this.footer);
      this.footer = null;
    } else {
      this.checkAllBtn.classList.add('todos-header__btn--visible');
      this.counter.innerHTML = todos.counter || this.lastCounter;
    }
  }

  function defindListAPI (todos) {
    var renderedTodos;

    if (todos.filter) {
      renderedTodos = {
        filter: todos.filter,
        list: this.model.filter(todos.filter),
        counter: this.model.getList().length
      };
    } else {
      this.lastCounter = todos.counter;
      renderedTodos = {
        list: todos.list,
        counter: todos.list.length
      };
    }

    this.renderTodosList(renderedTodos);
  }

  function renderHeader () {

    this.elem.headerElem = this.headerTemplate();
    console.log(this.elem.headerElem);

    this.todos.insertAdjacentHTML('afterBegin', this.headerTemplate());
    this.header = this.todos.querySelector('#header');

    this.checkAllBtn = this.header.querySelector('#check-all-btn');
    this.display = this.header.querySelector('#todos-display');

    this.subscribeHeaderElements();
  }

  function subscribeHeaderElements () {
    this.display.addEventListener('keyup', addTodo.bind(this), false);
    this.checkAllBtn.addEventListener('change', checkAllTodos.bind(this), false);
  }


  function renderCheckAllBtn () {
    if (this.model.containsCompleted()) {
      this.delAllCheckedTodosBtn.classList.add('todos-footer__del-btn--visible');
     } else {
      this.delAllCheckedTodosBtn.classList.remove('todos-footer__del-btn--visible');
    }
  }

  function renderTodosList (renderedTodos) {

    var todosList = this.container.querySelector('#list');
    todosList.innerHTML = '';

    for (var i = 0, l = renderedTodos.list.length; i < l; i++) {
      var TodoController = new applications.controllers.TodoController(renderedTodos.list[i]);
      TodoController.render();
    }
  }

  function clearDisplay () {
    this.display.value = null;
  }

  function renderFooter () {
    if (this.footer) return;

    this.elem.footerElem = this.footerTemplate();
    console.log(this.elem.footerElem);

    this.todos.insertAdjacentHTML('beforeEnd', this.footerTemplate());
    this.footer = this.container.querySelector('#footer');
    this.delAllCheckedTodosBtn = this.footer.querySelector('#del-checked-items-btn');
    this.counter = this.footer.querySelector('#counter');

    this.subscribeFooterElements();
  }

  function subscribeFooterElements () {
    this.footer.addEventListener('click', activateFilter.bind(this), false);
    this.delAllCheckedTodosBtn.addEventListener('click', delAllCheckedTodos.bind(this), false);
  }

  function unsubscribeFooterElements () {
    this.footer.removeEventListener('click', activateFilter.bind(this), false);
    this.delAllCheckedTodosBtn.removeEventListener('click', delAllCheckedTodos.bind(this), false);
  }

  function renderTodosListContainer () {

    this.elem.listElem = this.listTemplate();
    console.log(this.elem.listElem);

    this.todos.insertAdjacentHTML('beforeEnd', this.listTemplate());
  }


  function renderFilters (renderedTodos) {
    if (!this.footer) return;

    var allFilter = this.footer.querySelector('#all-filter');
    var activeFilter = this.footer.querySelector('#active-filter');
    var completedFilter = this.footer.querySelector('#completed-filter');

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

  function clearDisplay () {
    this.display.value = null;
  }

  function addTodo (event) {
    var targetValue = event.target.value;
    var enterKey = (event.keyCode === 13);
    if (enterKey && (targetValue.search(/\S/) === -1)) {
      this.clearDisplay(); 
      return; 
    }
    if (enterKey && targetValue) {
      this.model.add(applications.models.TodoModel, targetValue);
      this.clearDisplay(); 
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

  function delAllCheckedTodos (event) {
    var list = this.model.getList();

    for (var i = 0; i < list.length; i++) {
      if (list[i].state === 'Completed') {
        list[i].destroy();
      }
    }

    this.delAllCheckedTodosBtn.classList.remove('todos-footer__del-btn--visible');
  }

  function activateFilter (event) {
    var target = event.target;

    if (!target.classList.contains('todos-filter')) return; 

    event.preventDefault();
    this.filterModel.set('filter', target.innerHTML);
  }


  TodosListController.prototype.subscribe = subscribe;
  TodosListController.prototype.unsubscribe = unsubscribe;
  TodosListController.prototype.render = render;
  TodosListController.prototype.isContainerRendered = isContainerRendered;
  TodosListController.prototype.isCounterEqualsNull = isCounterEqualsNull;
  TodosListController.prototype.defindListAPI = defindListAPI;
  TodosListController.prototype.renderTodosListContainer = renderTodosListContainer;
  TodosListController.prototype.renderHeader = renderHeader;
  TodosListController.prototype.subscribeHeaderElements = subscribeHeaderElements;
  TodosListController.prototype.renderCheckAllBtn = renderCheckAllBtn;
  TodosListController.prototype.renderTodosList = renderTodosList;
  TodosListController.prototype.renderFooter = renderFooter;
  TodosListController.prototype.subscribeFooterElements = subscribeFooterElements;
  TodosListController.prototype.unsubscribeFooterElements = unsubscribeFooterElements;
  TodosListController.prototype.renderFilters = renderFilters;
  TodosListController.prototype.clearDisplay = clearDisplay;
  TodosListController.prototype.addTodo = addTodo;
  TodosListController.prototype.delAllCheckedTodos = delAllCheckedTodos;
  TodosListController.prototype.checkAllTodos = checkAllTodos;
  TodosListController.prototype.activateFilter = activateFilter;

  return TodosListController;

})();