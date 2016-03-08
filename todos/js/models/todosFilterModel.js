applications.models.TodosFilterModel = (function TodosFilterModelModule () {

  function TodosFilterModel (filter) {
    this.filter = filter;
  }


  function get() { return this.filter; }

  function set (filter) { 
    this.filter = filter;
    this.trigger('change', {filter: this.filter});
  }


  TodosFilterModel.prototype.get = get;

  TodosFilterModel.prototype.set = set;

 applications.utils.extend(TodosFilterModel, applications.mixins.eventMixin);


  return TodosFilterModel;

})();