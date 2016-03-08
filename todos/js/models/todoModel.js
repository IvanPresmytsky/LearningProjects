
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

  function get (prop) { return this.prop; }
    
  function set (prop, value) {
    this[prop] = value;
    this.trigger('change');
  }


  TodoModel.prototype.destroy = destroy;

  TodoModel.prototype.get = get;

  TodoModel.prototype.set = set;

  applications.utils.extend(TodoModel, applications.mixins.eventMixin);

  return TodoModel;
  
})();