applications.controllers = applications.controllers || {};

applications.controllers.AppController = (function appControllerModule() {

  function AppController(id) {
    var todosContainer = document.getElementById('todosContainerTemplate').innerHTML;
    var todo = new applications.models.TodoModel(169, 'Todo One');
    var todoTwo = new applications.models.TodoModel(190, 'Todo Two');
    var list = [];
    list.push(todo);
    list.push(todoTwo);

    this.id = id || null;
    this.element = {};
    this.template = Handlebars.compile(todosContainer);

    this.model = new applications.models.TodosModel();
    this.filterModel = new applications.models.TodosFilterModel('All');

    
    this.render();
    this.model.reset(list);
  }


  function render () {
    var appControllerAPI;
    this.todosListController = new applications.controllers.TodosListController(this.model, this.filterModel);
    if (this.id) {
      var body = document.body;
      appControllerAPI = {
       id: this.id
      };

      body.insertAdjacentHTML('afterBegin', this.template(appControllerAPI));
      this.container = document.getElementById(this.id);
      this.container.appendChild(this.todosListController.element);
    } else {
      appControllerAPI = {
        id: 131313
      }
      this.element = document.createElement('div');
      this.element.insertAdjacentHTML('afterBegin', this.template(appControllerAPI));
      this.container = document.getElementById(appControllerAPI.id);
      this.container.appendChild(this.todosListController.element);
    }

  }


  AppController.prototype.render = render;

  return AppController;

})();