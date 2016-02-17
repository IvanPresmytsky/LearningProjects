var applications = {};

(function (exports){

  var list = [{id: 1, state: "Active", selection: false, edition: false, content: "todo 1"}, 
              {id: 2, state: "Active", selection: false, edition: false, content: "todo 2"}];             
  var newListItemId = list.length;  
  var filter = 'All'; 

  exports.listModel = {

  	getList: function () { return list; },

  	getFilter: function () { return filter; },

  	getNewListItemId: function () { return newListItemId; },

    getlistItem: function (id) {
  	               var listItem = list.find( function getListItemById (item) {
                     return item.id == id;
  	               });
  	               return listItem;
                 },

  	setFilter: function (filterValue) {
  	             filter = filterValue;
               },
                       
    addToList: function (content) {
                 newListItemId++;
                 var newListItem = {
                   id: newListItemId,
                   state: 'Active',
                   selection: false,
                   edition: false,
                   content: content  
                 }
                 list.push(newListItem);
               },

    deleteFromList: function (parameter, id) {
                      list = list.filter(function deleteItem (item) {
                        return item[parameter] != id;	
                      });
                    },

    formFiltredList: function () {
                       var currentFilter = filter;
                       if (currentFilter === 'All') {
                         return list;
                       } else {
                         var filtredList = list.filter(function deleteItem (item) {
                           return item.state === currentFilter;	
                         });
                         return filtredList;
                       }
                     },

    checkingForCheckedTodos: function () {
                             var checkboxChecked = list.some(function findingForCompletedState (item) {
                               return item.state === 'Completed';
                             });
                               return checkboxChecked;
                             },

    changeListItemsParameters: function (param1, param2, param1Value, param2Value) {
                                 for (var i = 0; i < list.length; i++) {
                                   list[i][param1] = param1Value;
                                   list[i][param2] = param2Value;
                                 }         
                               }

  };
  
})(this.applications);

