applications.views.renderTodo =  (function () {

  function renderTodo (id, content, state, selection, edition) {
    
    if (!edition) {
      var containerState = '';
      var editorState = '';
    } else {
      var containerState = 'hidden';
      var editorState = 'visible';
    }

    var checked = '';

    if (state === 'Completed') {
      checked = 'checked';
    } 

    if (selection) {
      var selectionClass = 'todos-item__text--checked';
    } else {
      var selectionClass = '';
    }

    var TodoMarKup = '<li class="todos-item-container__todos-item" id="'+ id +'"> \
                        <div class="todos-item__visible-block '+ containerState +'"> \
                          <input class="todos-item__checkbox" id="checkbox-' + id + '" type="checkbox" name="todos-checkbox"' + checked +'/>\ ' +  
                          '<label for="checkbox-' + id + '" class="todos-item__checkbox-label"></label> \ ' +                    
                          '<label class="todos-item__text ' + selectionClass + '">' + content + '</label> \ ' +                    
                          '<button class="todos-item__del-btn  del-current-todos-item">X</button> \
                        </div> \
                        <input type="text" class="todos-item__edit-text ' + editorState + '" value="' + content + '"/> \
                      </li>';

    return TodoMarKup;              
  }

  return renderTodo;

})();



