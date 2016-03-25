applications.controllers.TodoController = (function todoControllerModule() {

  function TodoController(todo) {
    var todoTemplate = document.getElementById('todoTemplate').innerHTML;

    this.todo = todo;
    this.template = Handlebars.compile(todoTemplate);
    this.element = {};

    this.subscribe();
  }


  function subscribe () {
    this.todo.on('change', render.bind(this));
  }

  function unsubscribe () {
    this.todo.off('change', render.bind(this));
  }

  function render (todo) {
    var todosList = document.getElementById('list');

    if (todo) {
      this.todoContainer = document.getElementById(todo.id);
      this.todoContainer.outerHTML = this.template(todo);
      this.todoContainer = document.getElementById(todo.id);
      this.element = this.template(todo);
    } else {
      todosList.insertAdjacentHTML('beforeEnd', this.template(this.todo));
      this.todoContainer = document.getElementById(this.todo.id);
      this.element = this.template(this.todo);
    }

    this.subscribeTodoElements();
  }

  function subscribeTodoElements () {
    this.todosEditor = this.todoContainer.querySelector('.todos-item__edit-text');
    this.todosLabel = this.todoContainer.querySelector('.todos-item__text');
    this.todosDelBtn = this.todoContainer.querySelector('.del-current-todos-item');
    this.todoCheckbox = this.todoContainer.querySelector('#checkbox-' + this.todo.id);

    this.todosLabel.addEventListener('dblclick', editorFocus.bind(this), false);
    this.todosEditor.addEventListener('keyup', editorFocusLoss.bind(this), false);
    this.todosEditor.addEventListener('blur', focusLost.bind(this), true);
    this.todosDelBtn.addEventListener('click', remove.bind(this), false);
    this.todoCheckbox.addEventListener('change', checkTodosItem.bind(this), false);
  }

  function unsubscribeTodoElements () {
    this.todosLabel.removeEventListener('dblclick', editorFocus.bind(this), false);
    this.todosEditor.removeEventListener('keyup', editorFocusLoss.bind(this), false);
    this.todosEditor.removeEventListener('blur', focusLost.bind(this), true);
    this.todosDelBtn.removeEventListener('click', remove.bind(this), false);
    this.todoCheckbox.removeEventListener('change', checkTodosItem.bind(this), false);
  }

  function remove (event) {
    this.unsubscribe();
    this.unsubscribeTodoElements();
    this.todo.destroy(); 
  }


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
  TodoController.prototype.unsubscribe = unsubscribe;
  TodoController.prototype.render = render;
  TodoController.prototype.subscribeTodoElements = subscribeTodoElements;
  TodoController.prototype.unsubscribeTodoElements = unsubscribeTodoElements;
  TodoController.prototype.remove = remove;
  TodoController.prototype.checkTodosItem = checkTodosItem;
  TodoController.prototype.editorFocus = editorFocus;
  TodoController.prototype.focusLost = focusLost;
  TodoController.prototype.editorFocusLoss = editorFocusLoss;

  return TodoController;

})();