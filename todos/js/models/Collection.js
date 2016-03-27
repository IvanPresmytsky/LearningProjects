applications.models.Collection = (function collectionModule() {

  function Collection () {
    this.list = []; 
    this.newListItemId = this.list.length;
  }



  function subscribe (item) {
    item.on('destroy', remove.bind(this));
    item.on('change', itemChange.bind(this));
  }

  function unsubscribe (item) {
    item.off('destroy', remove.bind(this));
    item.off('change', itemChange.bind(this));
  }

  function getList () { return this.list; }


  function reset (list) {
    this.list = list;
    for (var i = 0; i < this.list.length; i++) {
      var item = this.list[i];
      this.subscribe(item);
    }
    this.trigger('reset', {list: list, counter: list.length}); 
  }


  function getlistItem (id) {
    return this.list.find( function getListItemById (item) {
      return item.id == id;
    });
  }


  function add (item, args) {
    this.newListItemId++;

    if (this.getlistItem(this.newListItemId) !== "undefinded") {
      var newListItem = new item((this.newListItemId + 10000), args);
    } else {
      var newListItem = new item(this.newListItemId, args);
    }

    this.list.push(newListItem);
    this.subscribe(newListItem);
    //this.trigger('add', newListItem);
    this.trigger('add', {list: this.list, counter: this.list.length});
  }


  function remove (id) {
    var deletedItem = this.getlistItem(id);
    this.list = this.list.filter(function deleteItem (item) {
      return item.id != id; 
    });
    this.unsubscribe(deletedItem);
    this.trigger('remove', {list: this.list, counter: this.list.length});
  }


  function itemChange (item) {
    var changedItem = this.getlistItem(item.id)
    changedItem = item;
    this.trigger('itemChange', {list: this.list, counter: this.list.length}); 
  }


  Collection.prototype.subscribe = subscribe;
  Collection.prototype.unsubscribe = unsubscribe;
  Collection.prototype.getList = getList;
  Collection.prototype.getlistItem = getlistItem;
  Collection.prototype.reset = reset;
  Collection.prototype.add = add;
  Collection.prototype.remove = remove;
  Collection.prototype.itemChange = itemChange;

  applications.utils.extend(Collection, applications.mixins.eventMixin);


  return Collection;

})();