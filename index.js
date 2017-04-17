module.exports = function(Class, validator) {
  if(typeof Class !== 'function') {
    throw new Error('simple-factory takes a function as it\'s first parameter.');
  }

  if(validator && typeof validator !== 'function') {
    throw new Error('simple-factory takes a function as it\'s second parameter');
  }

  function factory() {
    var args = Array.prototype.splice.call(arguments, 0);

    //pre-bind the arguments of the class to be what was passed
    //becuase you can't call .apply with the new keyword
    //NOTE: the first arg needs to be the scope - this
    var fn = Class.bind.apply(Class, [this].concat(args));

    if(typeof validator === 'function') {
      return validator.apply(this, args) ? new fn() : null;
    } else {
      return new fn();
    }
  }

  for (var prop in Class) {
    if (Class.hasOwnProperty(prop)) {
      factory[prop] = Class[prop];
    }
  }

  return factory;
};