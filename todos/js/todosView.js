(function (exports){

  function formTodosHeaderMarkup () {
    var headerMarkup = '<div class="todos-header"> \
                          <input class="todos-header__btn" id="checK-all-btn" type="checkbox"/> \
                          <input class="todos-header__text-input" id="todos-display" type="text" placeholder="What needs to be done?"/> \
                        </div>';
    return headerMarkup;        
  }

  function formTodosFooterMarkup () {

    var footerMarkup = '<div class="todos-footer" id="footer"> \
                          <span class="todos-footer__counter"> \
                          <span id="counter"> 0 </span> \
                            items left \
                          </span> \
                          <ul class="todos-footer__filters" id="todos-filters"> \
                            <li> <a href="#" class="todos-filter" id="all-filter">All</a> </li> \
                            <li> <a href="#" class="todos-filter" id="active-filter">Active</a> </li> \
                            <li> <a href="#" class="todos-filter" id="completed-filter">Completed</a> </li> \
                          </ul> \
                          <button class="todos-footer__del-btn"  id="del-checked-items-btn">Clear completed</button> \
                        </div>';
    return footerMarkup;
  }

  function formTodosListMarkup () {
    var listMarkup = '<div class="list-item-container" id="list-item-container"> \
                          <ul class="todos-item-container__list" id="list"> </ul> \
                        </div>';
    return listMarkup;        
  }


  function formTodosItemMarkup (id, content, state, selection, edition) {
    
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

    var TodosItemMarKup = '<li class="todos-item-container__todos-item" id="'+ id +'"> \
                        <div class="todos-item__visible-block '+ containerState +'"> \
                          <input class="todos-item__checkbox" id="checkbox-' + id + '" type="checkbox" name="todos-checkbox"' + checked +'/>\ ' +  
                          '<label for="checkbox-' + id + '" class="todos-item__checkbox-label"></label> \ ' +                    
                          '<label class="todos-item__text ' + selectionClass + '">' + content + '</label> \ ' +                    
                          '<button class="todos-item__del-btn  del-current-todos-item">X</button> \
                        </div> \
                        <input type="text" class="todos-item__edit-text ' + editorState + '" value="' + content + '"/> \
                      </li>';

    return TodosItemMarKup;              
  }



  exports.todosView = {

    formTodosHeaderMarkup: formTodosHeaderMarkup,
    formTodosListMarkup: formTodosListMarkup,
    formTodosItemMarkup: formTodosItemMarkup,
    formTodosFooterMarkup: formTodosFooterMarkup

  };


})(this.applications);

