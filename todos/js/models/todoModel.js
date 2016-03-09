
applications.models.TodoModel = (function todoModelModule() {

  function TodoModel (id, content) {
    this.id = id;
    this.content = content;
    this.state = 'Active';
    this.selection = false;
    this.edition = false;
  }


  function destroy () {
    this.trigger('destroy', {parameter: 'id', id: this.id});
  }


  TodoModel.prototype = Object.create(applications.models.Model.prototype);

  TodoModel.prototype.constructor = TodoModel;

  TodoModel.prototype.destroy = destroy;

  TodoModel.prototype.set = function () {

    applications.models.Model.prototype.set.apply(this, arguments);
    this.trigger('change', this);

  };


  return TodoModel;

})();