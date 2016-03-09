applications.models.Model = (function todoModelModule() {

  function Model () {}


  function get (prop) { return this.prop; }

  function set (prop, value) {
    this[prop] = value;
    this.trigger('change', this);
  }


  Model.prototype.get = get;

  Model.prototype.set = set;

  applications.utils.extend(Model, applications.mixins.eventMixin);

  return Model;
  
})();