
applications.models.TodosModel = (function todosModelModule() {

  function TodosModel () {
    applications.models.Collection.apply(this, arguments);
  }


  function filter (currentFilter) {
    if (currentFilter === 'All') {
      return this.list;
    } else {
      return this.list.filter(function filterList (item) {
        return item.state === currentFilter;  
      });
    }
  }

  function containsCompleted () {
    return this.list.some(function containsCompletedState (item) {
      return item.state === 'Completed';
    });
  }


  TodosModel.prototype = Object.create(applications.models.Collection.prototype);
  TodosModel.prototype.constructor = constructor;
  TodosModel.prototype.filter = filter;
  TodosModel.prototype.containsCompleted = containsCompleted;


  return TodosModel;

})();


