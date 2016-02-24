applications.models.TodosModelFilter = (function listModelCreation() {

  function TodosModelFilter () {
    this.filter = 'All';
  }
  

  function getFilter() { return this.filter; }

  function setFilter (filterValue) {
  	this.filter = filterValue;
  }
                        

  TodosModelFilter.prototype.getFilter = getFilter;

  TodosModelFilter.prototype.setFilter = setFilter;
                       
  return TodosModelFilter;
  
})();