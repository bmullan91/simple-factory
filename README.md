#simple-factory

###What is it?

Think of it as a factory to create factories.

#Install

Via npm, saving it as a dependency.

    npm i simple-factory --save

#Uses

__1.__ Eliminate boilerplate factory code.
__2.__ Validate arguments before invoking the constructor.
__2.__ Map items to objects succinctly [link](#heading1).

#Examples

####1. Lightweight factories

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