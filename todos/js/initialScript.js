
var model_1 = new applications.models.TodosModel();

var controller_1 = new applications.controllers.TodosController(model_1);

document.addEventListener('DOMContentLoaded', controller_1.todosReady());