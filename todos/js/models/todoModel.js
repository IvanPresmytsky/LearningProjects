
applications.models.TodoModel = (function todoModelModule() {

  function TodoModel (id, content) {           
    this.id = id;
    this.content = content;
    this.state = 'Active';
    this.selection = false;
    this.edition = false;   
  }

  function getId () { return this.id; }

  function getContent () { return this.content; }

  function setContent (newContent) { this.content = newContent; }

  function getState () { return this.state; }

  function setState (state) { this.state = state; }

  function getSelection () { return this.selection }

  function setSelection (selection) { this.selection = selection }

  function getEdition () { return this.edition }

  function setEdition (edition) { this.edition = edition }

  TodoModel.prototype.getId = getId;

  TodoModel.prototype.getContent = getContent;

  TodoModel.prototype.setContent = setContent;

  TodoModel.prototype.getState = getState;

  TodoModel.prototype.setState = setState;

  TodoModel.prototype.getSelection = getSelection;

  TodoModel.prototype.setSelection = setSelection;

  TodoModel.prototype.getEdition = getEdition;

  TodoModel.prototype.setEdition = setEdition;
  
  return TodoModel;
  
})();