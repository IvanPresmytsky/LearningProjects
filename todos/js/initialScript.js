
var model_1 = new applications.models.TodosModel();
var modelFilter_1 = new applications.models.TodosModelFilter();

var controller_1 = new applications.controllers.TodosController(model_1, modelFilter_1);
controller_1.render();
