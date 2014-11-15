module.exports = function(Class, validator) {
  if(typeof Class !== 'function') {
    throw new Error('simple-factory takes a function as it\'s first parameter.');
  }

  return function() {
    var args = Array.prototype.splice.call(arguments, 0);
    //the first arg needs to be the scope - this
    args.unshift(this);

    //pre-bind the arguments of the class to be what was passed
    //becuase you can't call .apply with the new keyword
    var fn = Class.bind.apply(Class, args);

    if(typeof validator === 'function') {
      return validator.apply(this, args) ? new fn() : null;
    } else {
      return new fn();
    }
  };
};