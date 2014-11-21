var expect = require('chai').expect;
var simpleFactory = require('../');

//reused class we are creating a factory for!
function Class() {
  this.args = Array.prototype.splice.call(arguments, 0);
}

describe('validation checks', function() {

  it('should throw if 0 param\'s passed', function() {
    expect(simpleFactory).to.throw(Error);
  });

  it('should throw if the class parameter is not a function', function() {
    expect(simpleFactory.bind({}, 'not a function')).to.throw(Error);
  });

  it('should throw throw if the second param is not a function', function() {
    expect(simpleFactory.bind({}, Class, 'not a function')).to.throw(Error);
  });

});

describe('creates expected classes', function() {
  //reused
  var factory = simpleFactory(Class);

  it('should create the correct class', function() {
    expect(factory()).to.be.an.instanceof(Class);
  });

  it('should pass all parameters to the class constructor', function() {
    var params = ['a', 'b', 'c', 1, 2, 3];
    var obj = factory.apply({}, params);

    expect(obj).to.be.an.instanceof(Class);

    var assigned = params.every(function(param, i) {
      return obj.args[i] === param;
    });

    expect(assigned).to.be.true;
  });

});

describe('using a validator', function() {

  it('should return null if it dosent pass', function() {
    function validator() {
      return false;
    };

    expect(simpleFactory(Class, validator)()).to.be.null;
  });

  it('simple validator should work', function() {
    var factory = simpleFactory(Class, function validator(num) {
      return num >= 10;
    });

    expect(factory()).to.be.null;
    expect(factory(-5)).to.be.null;
    expect(factory(9)).to.be.null;
    expect(factory(10)).to.be.instanceof(Class);
  });

});

describe('using as a mapper function', function() {

  it('should create an array of people', function() {
    function Person(config) {
      this.name = config.name;
      this.age = config.age;
    }

    var personFactory = simpleFactory(Person);
    var humans = [
      {
        name: 'John',
        age: 34
      },
      {
        name: 'Dick',
        age: 55
      },
      {
        name: 'Harry',
        age: 89
      }
    ];
    var people = humans.map(personFactory);

    //the checker
    var itWorks = humans.every(function(human, i) {
      var person = people[i];
      return (person instanceof Person && person.name === human.name && person.age === human.age)
    });

    expect(itWorks).to.be.true;
  });

});
