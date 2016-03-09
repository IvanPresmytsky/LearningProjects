applications.models.TodosFilterModel = (function TodosFilterModelModule () {

  function TodosFilterModel (filter) {
    this.filter = filter;
  }


  TodosFilterModel.prototype = Object.create(applications.models.Model.prototype);

  TodosFilterModel.prototype.constructor = TodosFilterModel;


  return TodosFilterModel;

})();