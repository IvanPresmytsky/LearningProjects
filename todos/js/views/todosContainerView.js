applications.views.renderTodosContainer = (function (){

  function renderTodosContainer (id) {
    var containerMarkup = '<div class="container" id="'+ id +'"> \
                             <h1 class="main-title">todos</h1>\
                             <div class="todos-container"> \
                             </div> \
                           </div>';
    return containerMarkup;
  }

  return renderTodosContainer;

})();