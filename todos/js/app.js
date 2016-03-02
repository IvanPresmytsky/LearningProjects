
var todosModel = new applications.models.TodosModel();
var todo = new applications.models.TodoModel(169, 'Todo One');
var todoTwo = new applications.models.TodoModel(190, 'Todo Two');
var filtersModel = new applications.models.TodosFilterModel('All');

var appController = new applications.controllers.TodosController(todosModel, filtersModel, 'containerOne');
appController.subscribe();

var list = [];
list.push(todo);
list.push(todoTwo);
todosModel.reset(list);


/*
var todosModel2 = new applications.models.TodosModel();
var filtersModel2 = new applications.models.TodosFilterModel('All');

var appController2 = new applications.controllers.TodosController(todosModel2, filtersModel2, 'pizda', 2);
appController2.render();*/