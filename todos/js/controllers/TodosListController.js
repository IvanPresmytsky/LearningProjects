//applications.controllers = applications.controllers || {};

applications.controllers.TodosListController = (function todosListControllerModule() {


  function TodosListController(model, filterModel, id) {
    this.model = model;
    this.filterModel = filterModel; 
    this.id = id;
    this.subscribe();
  }


  function subscribe () {
    this.model.on('reset', render.bind(this));
    this.model.on('add', render.bind(this));
    this.model.on('remove', render.bind(this));
    this.filterModel.on('change', render.bind(this));
  }


  function render (todos) {

    this.container = document.getElementById(this.id);

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

    this.renderTodosList(renderedTodos);
  }


  function renderTodosList (renderedTodos) {

    var todosList = this.container.querySelector('#list');

    var todosHeader = this.container.querySelector('#header');


    todosList.innerHTML = '';

    for (var i = 0, l = renderedTodos.list.length; i < l; i++) {
      console.log(todosList);
      var TodoController = new applications.controllers.TodoController(renderedTodos.list[i]);
      TodoController.renderTodo();
    }
  }


  function addItemToTodosList (targetValue) {
    this.model.add(applications.models.TodoModel, targetValue);
  }

/*
  function addTodoController (todo) {
    var TodoController = new applications.controllers.TodoController(todo);
    TodoController.renderTodo();
  }
*/

function checkAllTodos (target) {
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

function delAllCheckedTodos () {

  var list = this.model.getList();

  for (var i = 0; i < list.length; i++) {
    if (list[i].state === 'Completed') {
      list[i].destroy();
    }
  }
}

  TodosListController.prototype.subscribe = subscribe;

  TodosListController.prototype.render = render;

  TodosListController.prototype.renderTodosList = renderTodosList;

  TodosListController.prototype.addItemToTodosList = addItemToTodosList;

  TodosListController.prototype.delAllCheckedTodos = delAllCheckedTodos;

  TodosListController.prototype.checkAllTodos = checkAllTodos;


  return TodosListController;

})();