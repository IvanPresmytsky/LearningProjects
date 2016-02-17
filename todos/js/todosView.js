(function (exports){

  function formTodosMarkup (id, content, state, selection, edition) {
    
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
      var selectionClass = 'list-item__text--checked';
    } else {
      var selectionClass = '';
    }

    var listMarKup = '<li class="list-item-container__list-item" id="'+ id +'"> \
                        <div class="list-item__visible-block '+ containerState +'"> \
                          <input class="list-item__checkbox" id="checkbox-' + id + '" type="checkbox" name="todos-checkbox"' + checked +'/>\ ' +  
                          '<label for="checkbox-' + id + '" class="list-item__checkbox-label"></label> \ ' +                    
                          '<label class="list-item__text ' + selectionClass + '">' + content + '</label> \ ' +                    
                          '<button class="list-item__del-btn  del-current-list-item">X</button> \
                        </div> \
                        <input type="text" class="list-item__edit-text ' + editorState + '" value="' + content + '"/> \
                      </li>'

    return listMarKup;              
  }



  exports.todosView = {

    formTodosMarkup: formTodosMarkup

  };


})(this.applications);

