applications.models.TodosFilterModel = (function TodosFilterModelModule () {

  function TodosFilterModel (filter) {
    this.filter = filter;
  }


  TodosFilterModel.prototype = Object.create(applications.models.Model.prototype);

  TodosFilterModel.prototype.constructor = TodosFilterModel;

  TodosFilterModel.prototype.set = function (filter) {

    applications.models.Model.prototype.set.apply(this, arguments);
    this.trigger('change', this);

  };


  return TodosFilterModel;

})();