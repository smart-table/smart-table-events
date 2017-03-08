# smart-table-events

[![CircleCI](https://circleci.com/gh/smart-table/smart-table-events.svg?style=svg)](https://circleci.com/gh/smart-table/smart-table-events)

Tiny event emitter/event listener for nodejs and browsers. 

## Installation

### npm

``npm install --save smart-table-events``

### yarn

``yarn add smart-table-events``

## Usage

### Event emitter

```Javascript
import {emitter} from 'smart-table-events';

const em = emitter();

//a listener function 
const listener = (...args) => console.log(args);

//register to an event
em.on('MY_EVENT',listener);

//dispatch event
em.dispatch('MY_EVENT','foo','bar');
// > ['foo','bar']

//unsubscribe
em.off()// all listeners of all events;
em.off('MY_EVENT')// all listeners of event "MY_EVENT")
em.off('MY_EVENT', listener)// remove a particular listener
```
### Proxy listener

Create convenient/meaningful methods to register events.

```Javascript
import {emitter, proxyListener} from 'smart-table-events';

const em = emitter();
const proxyFactory = proxyListener({MY_EVENT:'myMethod'});
const instance = proxyFactory({emitter:em);

const listener = (...args) => console.log(args);

//register with convenient method
instance.myMethod(listener);

em.dispatch('MY_EVENT','foo','bar');
// > ['foo','bar']

//unsubscribe
instance.off('MY_EVENT') //unregister all listeners to MY_EVENT held by the proxy instance
instance.off() //unregister all listeners held by the proxy instance
```

## Contribute

### test

#### npm

``npm test``

#### yarn

``yarn test``

### Issues

**Bugs** only please (or feature request to be discussed), must come with **running example**
