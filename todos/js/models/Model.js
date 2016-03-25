applications.models.Model = (function todoModelModule() {

  function Model () {}


  function get (prop) { return this.prop; }

  function set (prop, value) {
    this[prop] = value;
    this.trigger('change', this);
  }

  function destroy () {
    this.trigger('destroy', this.id);
  }


  Model.prototype.get = get;
  Model.prototype.set = set;
  Model.prototype.destroy = destroy;

  applications.utils.extend(Model, applications.mixins.eventMixin);

  return Model;

})();