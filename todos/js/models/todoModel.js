
applications.models.TodoModel = (function todoModelModule() {

  function TodoModel (id, content) {
    this.id = id;
    this.content = content;
    this.state = 'Active';
    this.selection = false;
    this.edition = false;   
  }
  

  function get (prop) { return this.prop; }
    
  function set (prop, value) { this[prop] = value; }


  TodoModel.prototype.get = get;

  TodoModel.prototype.set = set;


  return TodoModel;
  
})();