applications.utils = applications.utils || {};

applications.utils.extend = (function extendModule() {

  function extend (module, mixin) {
    for (var methodName in mixin) {

      if (!mixin.hasOwnProperty(methodName)) { return; }

      if(!module.prototype[methodName]) {
        module.prototype[methodName] = mixin[methodName];
      }

    }
  }

  return extend;

})();