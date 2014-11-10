module.exports = function(Class, validator) {
  return function(data) {
    if(typeof validator === 'function') {
      return validator(data) ? new Class(data) : null;
    } else {
      return new Class(data);
    }
  };
};