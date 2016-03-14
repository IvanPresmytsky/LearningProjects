
applications.models.TodoModel = (function todoModelModule() {

  function TodoModel (id, content) {
    this.id = id;
    this.content = content;
    this.state = 'Active';
    this.selection = false;
    this.edition = false;
  }


  TodoModel.prototype = Object.create(applications.models.Model.prototype);

  TodoModel.prototype.constructor = TodoModel;


  return TodoModel;

})();