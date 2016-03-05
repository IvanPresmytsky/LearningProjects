applications.models.TodosFilterModel = (function TodosFilterModelModule () {

  function TodosFilterModel (filter) {
    this.filter = filter;
  }


  function get() { return this.filter; }

  function set (filter) { 
    this.filter = filter;
    this.trigger('change', {filter: this.filter});
  }


  TodosFilterModel.prototype.on = applications.eventMixin.on;

  TodosFilterModel.prototype.off = applications.eventMixin.off;

  TodosFilterModel.prototype.trigger = applications.eventMixin.trigger;

  TodosFilterModel.prototype.get = get;

  TodosFilterModel.prototype.set = set;


  return TodosFilterModel;

})();