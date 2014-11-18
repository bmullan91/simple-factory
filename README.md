TODO - work in progress.

#simple-factory

###What is it?

Think of it as a factory to create factories.

#Install

Via npm, saving it as a dependency.

    npm i simple-factory --save

#Uses

__1.__ Eliminate boilerplate factory code.
__2.__ Validate arguments before invoking the constructor.
__2.__ Map items to objects succinctly [](#heading).

#Examples

####1. Lightweight factories

A common pattern would be along the lines of:

```js
//Thing.js

function Thing(stuff) {
  this.stuff = stuff;
}

module.exports = function factory(stuff) {
  return new Thing(stuff);
};

```

This and many cases like it can be shortened to:

```js
module.exports = simpleFactory(Thing);
```

####2. Factory validators

In some senarios you will want to validate the input data before creating the object:

```js
function validate(stuff) {
  return stuff.plentify;
}

module.exports = function factory(stuff) {
  return validate(stuff) ? new Thing(stuff) : null;
};
```

This can be shortened to:

```js
//Same two functions defined above
module.exports = simpleFactory(Thing, validate);
```

####3. Mapping to objects succinctly 

We want to map an array of basic objects, transforming them into instances of our class -  **Person**.

```js
function Person(config) {
  this.name = config.name;
  this.age = config.age;
}
```
The data.
```js 
var items = [
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
```

The glue.

```js
var simpleFactory = require('simple-factory');
var personFactory = simpleFactory(Person);
//mapper
var people = items.map(personFactory);

//test
assert(people.every(function(person) {
  return person instanceof Person;
})); // -> true
```