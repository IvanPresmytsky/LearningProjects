(function (exports){

  function renderTodosFooter () {

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


  exports.todosFooterView = {

    renderTodosFooter: renderTodosFooter

  };


})(this.applications.views);