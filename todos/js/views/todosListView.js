(function (exports){

  function renderTodosList () {
    var listMarkup = '<div class="list-item-container" id="list-item-container"> \
                          <ul class="todos-item-container__list" id="list"> </ul> \
                        </div>';
    return listMarkup;        
  }

  exports.todosListView = {

    renderTodosList: renderTodosList

  };


})(this.applications.views);