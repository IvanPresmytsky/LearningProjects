applications.views.renderTodosContainer = (function (){

  function renderTodosContainer (title, id) {
    var containerMarkup = '<div class="container" id="container'+ id +'"> \
                             <h1 class="main-title">' + title + '</h1>\
                             <div class="todos-container"> \
                             </div> \
                           </div>';
    return containerMarkup;        
  }

  return renderTodosContainer;

})();