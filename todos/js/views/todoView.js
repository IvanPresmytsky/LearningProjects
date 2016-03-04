applications.views.renderTodo =  (function () {

  function renderTodo (todo) {
    
    if (!todo.edition) {
      var containerState = '';
      var editorState = '';
    } else {
      var containerState = 'hidden';
      var editorState = 'visible';
    }

    var checked = '';

    if (todo.state === 'Completed') {
      checked = 'checked';
    } 

    if (todo.selection) {
      var selectionClass = 'todos-item__text--checked';
    } else {
      var selectionClass = '';
    }

    var TodoMarKup = '<li class="todos-item-container__todos-item" id="'+ todo.id +'"> \
                        <div class="todos-item__visible-block '+ containerState +'"> \
                          <input class="todos-item__checkbox" id="checkbox-' + todo.id + '" type="checkbox" name="todos-checkbox"' + checked +'/>\ ' +  
                          '<label for="checkbox-' + todo.id + '" class="todos-item__checkbox-label"></label> \ ' +                    
                          '<label class="todos-item__text ' + selectionClass + '">' + todo.content + '</label> \ ' +                    
                          '<button class="todos-item__del-btn  del-current-todos-item">X</button> \
                        </div> \
                        <input type="text" class="todos-item__edit-text ' + editorState + '" value="' + todo.content + '"/> \
                      </li>';

    return TodoMarKup;              
  }

  return renderTodo;

})();



