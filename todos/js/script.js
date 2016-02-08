var list = []; // array of the todos

var newListItemId = 0;  // var for todos id creating
var filter = 'All'; // (Active, Completed) var for filter behavior
var todos = document.getElementById('list-container');
var listFooter = document.getElementById('footer');
var todosList = document.getElementById('list');
var display = document.getElementById('list-display');
var checkAllBtn = document.getElementById('checK-all-btn');
var delAllCheckedTodos = document.getElementById('del-checked-items-btn');


// This function add todos to todos array
function addToList () {
  newListItemId++;
  var newListItem = new Object();
  newListItem.id = newListItemId;
  newListItem.state = 'Active';
  newListItem.selection = false;
  newListItem.edition = false;
  newListItem.content = display.value;
  list.push(newListItem);
  console.log(newListItem);
}


// This function make marcup for visual "todos" todos
// arguments: content - content of the todos, selection - checking style-class ability, id - id of todos, state - (completed, active),
// edition - state of 'list-item__edit-text' (false - hidden, true - active)
function formListMarkup (content, selection, id, state, edition) {
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


function setEditableState (todosId, isEditable, content) {
  var editedTodos = list.find(function findEditableItem (item) {
    return item.id == todosId;
  });
  if (arguments[2]) {
    editedTodos.content = content;
  }
  editedTodos.edition = isEditable;
}


// This function renders adddition and removing of todos
function renderList (renderingList) {
  todosList = document.getElementById('list');
  listFooter = document.getElementById('footer');
  var listItemCounter = document.getElementById('counter');
  todosList.innerHTML = '';
  
  for (var i = 0, l = renderingList.length; i < l; i++) {

    var listItemMarkup = formListMarkup(renderingList[i].content, renderingList[i].selection, renderingList[i].id, renderingList[i].state, renderingList[i].edition);
    todosList.insertAdjacentHTML('beforeEnd', listItemMarkup);

    var todosEditor = todosList.getElementsByClassName('list-item__edit-text')[i];
    var todosLabel = todosList.getElementsByClassName('list-item__text')[i];

    todosLabel.addEventListener('dblclick', function activateTodosEditor (event) {
      var target = event.target;   
      var todosId = target.parentNode.parentNode.id;

      setEditableState(todosId, true);
      renderTodos();
      todosEditor.focus();
    }, false);


    todosEditor.addEventListener('blur', function focusLost(event) {
      var target = event.target;
      var content = target.value;
      var todosId = target.parentNode.id;

      setEditableState(todosId, false, content);
      renderTodos(); 
    }, true);

  }

  if (list.length === 0) {
    listFooter.classList.remove('list-footer--visible');
    checkAllBtn.classList.remove('list-header__btn--visible');
  } else {
    listFooter.classList.add('list-footer--visible');
    checkAllBtn.classList.add('list-header__btn--visible');
    listItemCounter.innerHTML = list.length;
  }

  if (checkingForCheckedTodos()) {
    delAllCheckedTodos.classList.add('list-footer__del-btn--visible');
  } else {
    delAllCheckedTodos.classList.remove('list-header__del-btn--visible');
  }



}


// This function removes todos from todos array
function deleteFromList (parameter, id) {
  list = list.filter(function deleteItem (item) {
    return item[parameter] != id;
  });
}


// This function renders filtred todos
function renderTodos () {
  var allFilter = document.getElementById('all-filter');
  var activeFilter = document.getElementById('active-filter');
  var completedFilter = document.getElementById('completed-filter');

  allFilter.classList.remove('list-footer__filters--active');
  activeFilter.classList.remove('list-footer__filters--active');
  completedFilter.classList.remove('list-footer__filters--active');

  //от if-ов не удалось уйти из-за необходимости подсвечивания активного фильтра

if (filter === 'All') {
  renderList(list);
  allFilter.classList.add('list-footer__filters--active');
} else {
  var todosToRender = list.filter(function activateFilter(item) {
    return item.state === filter;
  });

  if (filter === 'Active') {
    activeFilter.classList.add('list-footer__filters--active');
  } else if (filter === 'Completed') {
    completedFilter.classList.add('list-footer__filters--active');
  }

  renderList(todosToRender);
}
 
}


// This function checks for checboxes checking and adds behavior for them
// args: 
function serchingForCheckedTodos (checkbox, id) {
  var checkTodos = list.find(function defineCheckedTodos (item) {
        return item.id == id;
  });
  console.log(checkTodos);
  if (checkbox.checked) {    
    checkTodos.state = 'Completed';
    checkTodos.selection = true;
  } else {
    checkTodos.state = 'Active';
    checkTodos.selection = false;      
  }

}

function checkAllTodos (checkAll) {
  var len = list.length;
  if (checkAll.checked) {
    for (var i = 0; i < len; i++) {
      var item = list[i];
      item.state = 'Completed';
      item.selection = true;
    }           
  } else {
    for (var i = 0; i < len; i++) {
      var item = list[i];
      item.state = 'Active';
      item.false = '';
    }
  }
}

// This function checks for only one of checboxes is checking and return boolean
function checkingForCheckedTodos () {
  var checkboxChecked = list.some(function findingForCompletedState (item) {
    return item.state === 'Completed';
  });
  return checkboxChecked;
}

//??? где лучше поставить этот обработчик сдесь или внутри рендерной функции ???

/*
todosList.addEventListener('dblclick', function activeTodosEditor (event) {
  var target = event.target;

  if (!target.classList.contains('list-item__text')) {
    return;
  }
  var todosId = target.parentNode.parentNode.id;

  setEditableState(todosId, true);
  renderTodos();
}, false);
*/

checkAllBtn.addEventListener('change', function checkAllTodos (event) {
    //console.log(event.target);
    checkAllTodos(this);
    renderTodos();
}, false);


todosList.addEventListener('change', function checkTodos(event) {
  var target = event.target
  
  if (!target.classList.contains('list-item__checkbox')) {return;}

  var todosId = target.parentNode.parentNode.id;
  serchingForCheckedTodos(target, todosId);
  renderTodos();

}, false);


todosList.addEventListener('click', function activateDelBtn(event) {
  var target = event.target;
  var todos = target.parentNode.parentNode;
  if (!target.classList.contains('del-current-list-item')) {
    return;
  } 
  deleteFromList('id', todos.id);
  renderTodos();
}, false); 


listFooter.addEventListener('click', function activateFilter(event) {
  var target = event.target;

  if (target.classList.contains('list-items-filter')) {
    event.preventDefault();
    filter = target.innerHTML;  //???//
    renderTodos();
  } else if (target.id === 'del-checked-items-btn') {
    deleteFromList('state', 'Completed');
    renderTodos();
  } else {
    return;
  }
  
}, false);


todos.addEventListener('keyup', function(event) {
  var target = event.target;
  var enterKey = (event.keyCode === 13);
  var spaceKey = (event.keyCode === 32);
  
  if ((target.id === 'list-display'||target.classList.contains('list-item__edit-text')) && spaceKey && (target.value[0] === ' ')) {
    target.value = null;
  } 
  if (target.id === 'list-display' && enterKey && target.value) {
    addToList();
    renderTodos();  
    display.value = null; 
  } else if (target.classList.contains('list-item__edit-text') && enterKey && target.value) {
    target.blur();
  } else {
    return;
  }
}, false);