applications.controllers.TodoController = (function todoControllerModule() {


  function TodoController(todo) {
    this.todo = todo;
    this.subscribe();
  }

  function subscribe () {
    this.todo.on('change', renderTodo.bind(this));
  }


  function renderTodo (todo) {
    var todosList = document.getElementById('list');
    var todoTemplate = document.getElementById('todoTemplate').innerHTML;
    var template = Handlebars.compile(todoTemplate);

    if (todo) {
      var todoContainer = document.getElementById(todo.id);
      todoContainer.outerHTML = template(todo);
      todoContainer = document.getElementById(todo.id);
    } else {
      todosList.insertAdjacentHTML('beforeEnd', template(this.todo));
      var todoContainer = document.getElementById(this.todo.id);
    }

    var todosEditor = todoContainer.querySelector('.todos-item__edit-text');
    var todosLabel = todoContainer.querySelector('.todos-item__text');
    var todosDelBtn = todoContainer.querySelector('.del-current-todos-item');
    var todoCheckbox = todoContainer.querySelector('#checkbox-' + this.todo.id);

    todosLabel.addEventListener('dblclick', editorFocus.bind(this), false);

    todosEditor.addEventListener('keyup', editorFocusLoss.bind(this), false);

    todosEditor.addEventListener('blur', focusLost.bind(this), true);

    todosDelBtn.addEventListener('click', activateDelBtn.bind(this), false);

    todoCheckbox.addEventListener('change', checkTodosItem.bind(this), false);
    
  }


  function activateDelBtn (event) { this.todo.destroy(); }


  function checkTodosItem (event) {
    var target = event.target; 

    if (target.checked) {
      this.todo.set('state', 'Completed');
      this.todo.set('selection', true);
    } else {
      this.todo.set('state', 'Active');
      this.todo.set('selection', false);
    }
  }


  function editorFocus (event) {
    var target = event.target;

    target.parentNode.nextElementSibling.classList.add('visible');
    target.parentNode.classList.add('hidden');
    target.parentNode.nextElementSibling.focus();
  }


  function editorFocusLoss (event) {
    if (event.keyCode === 13) event.target.blur();
  } 

  function focusLost (event) {
    var value = event.target.value;
    if (value === "") {
      this.todo.destroy();
    } else {
      this.todo.set('content', value);
    }
  }


  TodoController.prototype.subscribe = subscribe;

  TodoController.prototype.renderTodo = renderTodo;

  TodoController.prototype.activateDelBtn = activateDelBtn;

  TodoController.prototype.checkTodosItem = checkTodosItem;

  TodoController.prototype.editorFocus = editorFocus;

  TodoController.prototype.focusLost = focusLost;

  TodoController.prototype.editorFocusLoss = editorFocusLoss;


  return TodoController;

})();