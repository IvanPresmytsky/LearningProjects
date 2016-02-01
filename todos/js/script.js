var list = []; // array of the notes
var totalItemsCount = 0; // notes quantity
var newListItemId = 0;  // var for notes id creating
var filter = 'All'; // (Active, Completed) var for filter behavior
var todos = document.getElementById('list-container');
var listFooter = document.getElementById('footer');
var noteList = document.getElementById('list');
var display = document.getElementById('list-display');
var checkAllBtn = document.getElementById('checK-all-btn');
var delAllCheckedNotes = document.getElementById('del-checked-items-btn');


// This function add notes to notes array
function addToList () {
  newListItemId++;
  var newListItem = new Object();
  newListItem.id = 'note' + newListItemId;
  newListItem.state = 'active';
  newListItem.selection = '';
  newListItem.eddition = false;
  newListItem.content = getDisplayvalue();
  newListItem.marcup = formListMarcup(newListItem.content, newListItem.selection, newListItem.id, newListItem.state, newListItem.eddition);
  list.push(newListItem);
  console.log(newListItem);
  totalItemsCount = list.length;
}


//???//
function getDisplayvalue () {
 return document.getElementById('list-display').value;
}


function clearDisplay () {
  document.getElementById('list-display').value = null; 
}


// This function make marcup for visual "todos" notes
// arguments: content - content of the note, selection - checking style-class ability, id - id of note, state - (completed, active),
// eddition - state of 'list-item__edit-text' (false - hidden, true - active)
function formListMarcup (content, selection, id, state, eddition) {
  if (!eddition) {
    var containerState = '';
    var editorState = '';
    var focus = '';    
  } else {
    var containerState = 'hidden';
    var editorState = 'visible';
    var focus = ' autofocus'
  }
  var checked = '';
  if (state === 'completed') {
    checked = 'checked';
  } 
  console.log(focus);
  var listMarcup = '<li class="list-item-container__list-item" id="'+ id +'"> \
                      <div class="list-item__visible-block '+ containerState +'"> \
                        <input class="list-item__checkbox" id="checkbox-' + id + '" type="checkbox" name="note-checkbox"' + checked +'/>\ ' +  
                        '<label for="checkbox-' + id + '" class="list-item__checkbox-label"></label> \ ' +                    
                        '<label class="list-item__text ' + selection + '">' + content + '</label> \ ' +                    
                        '<button class="list-item__del-btn  del-current-list-item">X</button> \
                      </div> \
                      <input type="text" class="list-item__edit-text ' + editorState + '" value="' + content + '"' + focus + '/> \
                    </li>'
  return listMarcup;              
}

function checkForEddition (noteId, edditionBoolean, content) {
  var editedNote = list.filter(function activateFilter(item) {
    return item.id === noteId;
  })[0];

  editedNote.content = content;  
  editedNote.eddition = edditionBoolean;
  editedNote.marcup = formListMarcup(editedNote.content, editedNote.selection, editedNote.id, editedNote.state, editedNote.eddition);
}

// This function renders adddition and removing of notes
function renderList (renderingList) {
  noteList = document.getElementById('list');
  listFooter = document.getElementById('footer');
  var listItemCounter = document.getElementById('counter');
  noteList.innerHTML = '';
  
  for (var i = 0, l = renderingList.length; i < l; i++) {
    noteList.insertAdjacentHTML('beforeEnd', renderingList[i].marcup);
  }

  if (totalItemsCount === 0) {
    listFooter.style.display = 'none';
    checkAllBtn.style.visibility = 'hidden';
  } else {
    listFooter.style.display = 'block';
    checkAllBtn.style.visibility = 'visible';
    listItemCounter.innerHTML = totalItemsCount;
  }

  if (checkForCheckedCheckboxes()) {
    delAllCheckedNotes.style.visibility = 'visible';
  } else {
    delAllCheckedNotes.style.visibility = 'hidden';
  }
}



// This function removes notes from notes array
function deleteFromList (parameter, id) {
  list = list.filter(function activeFilter(item) {
    return item[parameter] != id;
  });
 totalItemsCount = list.length; 
}


// This function renders filtred notes
function renderingFiltredList () {
  var allFilter = document.getElementById('all-filter');
  var activeFilter = document.getElementById('active-filter');
  var completedFilter = document.getElementById('completed-filter');
  allFilter.classList.remove('list-footer__filters--active');
  activeFilter.classList.remove('list-footer__filters--active');
  completedFilter.classList.remove('list-footer__filters--active');
  function displayItems (state) {
    var renderingList = list.filter(function activateFilter(item) {
      return item.state === state;
    });
    return renderingList;
  }
  
  if (filter === 'All') {
    renderList(list);
    allFilter.classList.add('list-footer__filters--active');
  } else if (filter === 'Active') {
    renderList(displayItems('active'));
    activeFilter.classList.add('list-footer__filters--active');
  } else if (filter === 'Completed') {
    renderList(displayItems('completed'));
    completedFilter.classList.add('list-footer__filters--active');
  } 
}


// This function checks for checboxes checking and adds behavior for them
// args: 
function checkForChecked (checkbox, id) {
  var checkNote = list.filter(function defineCheckedNote (item) {
        return item.id === id;
      })[0];
  if (checkbox.checked) {    
    checkNote.state = 'completed';
    checkNote.selection = 'list-item__text--checked';
  } else {
    checkNote.state = 'active';
    checkNote.selection = '';      
  }
  checkNote.marcup = formListMarcup(checkNote.content, checkNote.selection, checkNote.id, checkNote.state);

}

function checkAllNotes (checkAll) {
  var len = list.length;
  if (checkAll.checked) {
    for (var i = 0; i < len; i++) {
      var item = list[i];
      item.state = 'completed';
      item.selection = 'list-item__text--checked';
      item.marcup = formListMarcup(item.content, item.selection, item.id, item.state);
    }           
  } else {
    for (var i = 0; i < len; i++) {
      var item = list[i];
      item.state = 'active';
      item.selection = '';
      item.marcup = formListMarcup(item.content, item.selection, item.id, item.state);
    }
  }
}

// This function checks for only one of checboxes is checking and return boolean
function checkForCheckedCheckboxes () {
  var checkboxChecked = list.some(function (item) {
    return item.state === 'completed';
  });

  return checkboxChecked;
}


noteList.addEventListener('dblclick', function activeNoteEditor (event) {
  var target = event.target;

  if (!target.classList.contains('list-item__text')) {
    return;
  }
  var content = target.innerHTML;
  var note = target.parentNode.parentNode;
  var noteId = note.id;

  checkForEddition(noteId, true, content);
  renderingFiltredList();
}, false);


todos.addEventListener('blur', function focusLost(event) {
  var target = event.target;
  if(!target.classList.contains('list-item__edit-text')){
    return;
  } 
  var content = target.value;
  var note = target.parentNode;
  var noteId = note.id;

  checkForEddition(noteId, false, content);
  renderingFiltredList(); 
}, true);


todos.addEventListener('change', function (event) {
  var target = event.target
  
  if (target.classList.contains('list-item__checkbox')) {
    var note = target.parentNode.parentNode;
    var noteId = note.id;

    checkForChecked(target, noteId);
    renderingFiltredList();
    
  } else if (target.id === 'checK-all-btn') {
    checkAllNotes(target);
    renderingFiltredList();
  } else {
    return;
  }
}, false);


noteList.addEventListener('click', function activateDelBtn(event) {
  var target = event.target;
  var note = target.parentNode.parentNode;
  if (!target.classList.contains('del-current-list-item')) {
    return;
  } 
  deleteFromList('id', note.id);
  renderingFiltredList();
}, false); 


listFooter.addEventListener('click', function activateFilter(event) {
  var target = event.target;

  if (target.classList.contains('list-items-filter')) {
    event.preventDefault();
    filter = target.innerHTML;
    renderingFiltredList();
  } else if (target.id === 'del-checked-items-btn') {
    deleteFromList('state', 'completed');
    renderingFiltredList();
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
    renderingFiltredList();   
    clearDisplay();
  } else if (target.classList.contains('list-item__edit-text') && enterKey && target.value) {
    target.blur();
  } else {
    return;
  }
}, false);