(function (exports){

  function renderTodosHeader () {
    var headerMarkup = '<div class="todos-header"> \
                          <input class="todos-header__btn" id="checK-all-btn" type="checkbox"/> \
                          <input class="todos-header__text-input" id="todos-display" type="text" placeholder="What needs to be done?"/> \
                        </div>';
    return headerMarkup;        
  }

  exports.todosHeaderView = {

    renderTodosHeader: renderTodosHeader

  };


})(this.applications);