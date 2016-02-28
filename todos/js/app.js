
var todosModel = new applications.models.TodosModel();
var todo = new applications.models.TodoModel(169, 'pizda');
todosModel.setDefaultTodo(todo);
var filtersModel = new applications.models.TodosFilterModel('All');

var appController = new applications.controllers.TodosController(todosModel, filtersModel, 'hui', 1);
appController.render();


/*
var todosModel2 = new applications.models.TodosModel();
var filtersModel2 = new applications.models.TodosFilterModel('All');

var appController2 = new applications.controllers.TodosController(todosModel2, filtersModel2, 'pizda', 2);
appController2.render();*/