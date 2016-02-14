(function (exports){

  var todos = document.getElementById('list-container');
  var display = document.getElementById('list-display');
  var checkAllBtn = document.getElementById('checK-all-btn');
  var todosList = document.getElementById('list');
  var delAllCheckedTodos = document.getElementById('del-checked-items-btn');
  var listFooter = document.getElementById('footer');

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


  function renderList (renderingList, itemCounter, isChecked) {
    todosList = document.getElementById('list');
    listFooter = document.getElementById('footer');
    var listItemCounter = document.getElementById('counter');
    todosList.innerHTML = '';
  
    for (var i = 0, l = renderingList.length; i < l; i++) {

      var listItemMarkup = formTodosMarkup(renderingList[i].id, renderingList[i].content, renderingList[i].state, renderingList[i].selection, renderingList[i].edition);
      todosList.insertAdjacentHTML('beforeEnd', listItemMarkup);

      var todosEditor = todosList.getElementsByClassName('list-item__edit-text')[i];
      var todosLabel = todosList.getElementsByClassName('list-item__text')[i];

      todosLabel.addEventListener('dblclick', function editorFocus(event) {
        var target = event.target;
        var todosVisibleBlock = target.parentNode;
        var todosEditor = target.parentNode.nextElementSibling;
        todosEditor.classList.add('visible');
        todosVisibleBlock.classList.add('hidden');
        todosEditor.focus();
      }, false);

      todosEditor.addEventListener('blur', controller.focusLost, true);

    }

    if (itemCounter === 0) {
      listFooter.classList.remove('list-footer--visible');
      checkAllBtn.classList.remove('list-header__btn--visible');
    } else {
      listFooter.classList.add('list-footer--visible');
      checkAllBtn.classList.add('list-header__btn--visible');
      listItemCounter.innerHTML = itemCounter;
    }
  
    if (isChecked) {
      delAllCheckedTodos.classList.add('list-footer__del-btn--visible');
    } else {
      delAllCheckedTodos.classList.remove('list-header__del-btn--visible');
    }
  }


  exports.renderTodos = function(renderingList, filter, itemCounter, isChecked) {
    var allFilter = document.getElementById('all-filter');
    var activeFilter = document.getElementById('active-filter');
    var completedFilter = document.getElementById('completed-filter');

    allFilter.classList.remove('list-footer__filters--active');
    activeFilter.classList.remove('list-footer__filters--active');
    completedFilter.classList.remove('list-footer__filters--active');

    if (filter === 'All') {
      allFilter.classList.add('list-footer__filters--active');
    } else if (filter === 'Active') {
      activeFilter.classList.add('list-footer__filters--active');
    } else if (filter === 'Completed') {
      completedFilter.classList.add('list-footer__filters--active');
    }
    renderList(renderingList, itemCounter, isChecked); 
  };

  exports.clearDisplay = function() {
    display.value = null;
  };
  
  document.addEventListener('DOMContentLoaded', controller.ready);

  todosList.addEventListener('change', controller.checkTodos, false);

  checkAllBtn.addEventListener('change', controller.checkAllTodos, false);

  todos.addEventListener('keyup', controller.enterKeyPressed, false);

  todos.addEventListener('keyup', function editorFocusLoss (event) {
    var target = event.target;
    var enterKey = (event.keyCode === 13);
    if (target.classList.contains('list-item__edit-text') && enterKey && target.value) {
      target.blur();
    } 
  }, false);

  todosList.addEventListener('click', controller.activateDelBtn, false); 

  listFooter.addEventListener('click', controller.activateFilter, false);

  listFooter.addEventListener('click', controller.activateDelAllCheckedBtn, false);

  
  

})(this.viewModel = {});

