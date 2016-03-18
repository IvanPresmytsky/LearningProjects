applications.controllers = applications.controllers || {};

applications.controllers.AppController = (function appControllerModule() {


  function AppController(model, filterModel, id) {
    this.id = id;
    this.model = model;
    this.filterModel = filterModel;
    this.subscribe();
    this.firstRender();
  }


  function subscribe () {
    this.model.on('reset', render.bind(this));
    this.model.on('add', render.bind(this));
    this.model.on('remove', render.bind(this));
    this.model.on('itemChange', renderCheckAllBtn.bind(this));
    this.filterModel.on('change', renderFilters.bind(this));
  }


  function firstRender () {

    var body = document.body;
    var todosContainer = document.getElementById('todosContainerTemplate').innerHTML;
    var template = Handlebars.compile(todosContainer);

    body.insertAdjacentHTML('afterBegin', template(this));

    this.container = document.getElementById(this.id);
    this.renderHeader();
    this.renderTodosListContainer();
    this.todosListController = new applications.controllers.TodosListController(this.model, this.filterModel, this.id);

  }


  function render (todos) {

    if (this.header && todos.counter === 0) {
      this.checkAllBtn.classList.remove('todos-header__btn--visible');
    } else {
      this.checkAllBtn.classList.add('todos-header__btn--visible');
    }

    if (!this.footer && todos.counter > 0) {
      this.renderFooter(todos);
    }

    if (todos.counter === 0) {
      this.todos.removeChild(this.footer);
      this.footer = null;
    }

    if (this.footer && todos.counter > 0) {
      this.counter.innerHTML = todos.counter;
    }

  }


  function clearDisplay () {
    this.display = this.container.querySelector('#todos-display');
    this.display.value = null;
  }


  function renderHeader (todos) {
    this.todos = this.container.querySelector('.todos-container');

    var todosHeader = document.getElementById('todosHeaderTemplate').innerHTML;
    var template = Handlebars.compile(todosHeader);

    this.todos.insertAdjacentHTML('afterBegin', template());
    this.header = this.todos.querySelector('#header');
    this.checkAllBtn = this.header.querySelector('#check-all-btn');
    this.display = this.header.querySelector('#todos-display');

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



  function renderFooter (todos) {

      var todosFooter = document.getElementById('todosFooterTemplate').innerHTML;
      var template = Handlebars.compile(todosFooter);

      this.todos.insertAdjacentHTML('beforeEnd', template());

      this.footer = this.container.querySelector('#footer');

      this.delAllCheckedTodosBtn = this.footer.querySelector('#del-checked-items-btn');

      this.counter = this.footer.querySelector('#counter');

      this.counter.innerHTML = todos.counter;

      this.footer.addEventListener('click', activateFilter.bind(this), false);

      this.delAllCheckedTodosBtn.addEventListener('click', activateDelAllCheckedBtn.bind(this), false);

  }


  function renderTodosListContainer () {
    var todosList = document.getElementById('todosListTemplate').innerHTML;
    var template = Handlebars.compile(todosList);


    this.todos.insertAdjacentHTML('beforeEnd', template());
  }


  function renderFilters (renderedTodos) {

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


  function addTodo (event) {
    var targetValue = event.target.value;
    var enterKey = (event.keyCode === 13);
    if (enterKey && (targetValue.search(/\S/) === -1)) {
      this.clearDisplay(); 
      return; 
    }
    if (enterKey && targetValue) {
      this.todosListController.addItemToTodosList(targetValue);
      this.clearDisplay(); 
    }
  }


  function checkAllTodos (event) {
    var target = event.target;
    this.todosListController.checkAllTodos(target);
  }


  function activateDelAllCheckedBtn (event) {
    this.todosListController.delAllCheckedTodos();
    this.delAllCheckedTodosBtn.classList.remove('todos-footer__del-btn--visible');
  }


  function activateFilter (event) {
    var target = event.target;

    if (!target.classList.contains('todos-filter')) return; 

    event.preventDefault();
    this.filterModel.set('filter', target.innerHTML);
  }


  AppController.prototype.subscribe = subscribe;

  AppController.prototype.clearDisplay = clearDisplay;

  AppController.prototype.firstRender = firstRender;

  AppController.prototype.render = render;

  AppController.prototype.renderTodosListContainer = renderTodosListContainer;

  AppController.prototype.renderHeader = renderHeader;

  AppController.prototype.renderCheckAllBtn = renderCheckAllBtn;

  AppController.prototype.renderFooter = renderFooter;

  AppController.prototype.renderFilters = renderFilters;

  AppController.prototype.addTodo = addTodo;

  AppController.prototype.checkAllTodos = checkAllTodos;

  AppController.prototype.activateDelAllCheckedBtn = activateDelAllCheckedBtn;

  AppController.prototype.activateFilter = activateFilter;


  return AppController;

})();