/* eslint-disable no-underscore-dangle */
export default class EventEmitter {
  constructor() {
    this._handlers = {};
  }
  on(eventName, handler) {
    let handlers = this._handlers[eventName];
    if (!handlers) {
      this._handlers[eventName] = handlers = [];
    }
    handlers.push(handler);
    return {
      remove() {
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      },
    };
  }
  once(eventName, handler) {
    return new Promise((resolve) => {
      const token = this.on(eventName, (...args) => {
        token.remove();
        handler(...args);
        resolve();
      });
    });
  }
  emit(eventName, ...args) {
    const handlers = this._handlers[eventName];
    if (!handlers) return;
    handlers.forEach(fn => fn(...args));
  }
}
