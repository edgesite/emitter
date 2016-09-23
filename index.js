/* eslint-disable max-len,eqeqeq,no-underscore-dangle,no-param-reassign,no-restricted-syntax,no-prototype-builtins */

function each(obj, fn) {
  if (obj.forEach) {
    obj.forEach(fn);
  } else if (obj.length) {
    for (let i = 0; i < obj.length; i++) {
      fn(obj[i], i, obj);
    }
  } else if (obj.hasOwnProperty) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        fn(obj[key], key, obj);
      }
    }
  }
}

class Set {
  constructor() {
    this._set = [];
  }
  add(item) {
    if (!this.has(item)) {
      this._set.push(item);
    }
  }
  remove(item) {
    const index = this._set.indexOf(item);
    if (index == -1) {
      return false;
    }
    this._set.splice(index, 1);
    return true;
  }
  has(item) {
    return this._set.indexOf(item) != -1;
  }
  items() {
    return this._set;
  }
  forEach(fn) {
    each(this.items, fn);
  }
}

class Listener {
  constructor(emitter, eventType, handler) {
    this._emitter = emitter;
    this._eventType = eventType;
    this.handler = handler;
  }
  remove() {
    this._emitter.removeListener(this._eventType, this.handler);
  }
}

export class BaseEventEmitter {
  constructor() {
    this.registry = {};
  }
  addListener(eventType, listener, once) {
    let handlers = this.registry[eventType];
    if (!handlers) {
      handlers = new Set();
      this.registry[eventType] = handlers;
    }
    handlers.add(listener);
    return new Listener(this, eventType, listener);
  }
  removeListener(eventType, listener) {
    const handlers = this.registry[eventType];
    if (handlers) {
      handlers.remove(listener);
    }
  }
  removeAllListeners(eventType) {
    if (eventType === undefined) {
      this.registry = {};
      return;
    }
    delete this.registry[eventType];
  }
  listeners(eventType) {
    const listeners = this.registry[eventType];
    return listeners ? listeners.items() : [];
  }
  emit(eventType, ...args) {
    let listener;
    for (listener of this.listeners(eventType)) {
      listener(...args);
    }
  }
}

export default class EventEmitter extends BaseEventEmitter {
  on(eventType, listener) {
    return this.addListener(eventType, listener);
  }
  once(eventType, listener) {
    return this.addListener(eventType, onceListener, true);
  }
}
