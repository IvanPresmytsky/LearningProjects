
applications.models.TodosItemModel = (function listModelCreation() {

  function TodosItemModel (id, content) {           
    this.id = id;
    this.content = content;
    this.state = 'Active';
    this.selection = false;
    this.edition = false;   
  }
  
  return TodosItemModel;
  
})();