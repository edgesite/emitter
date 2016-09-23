import EventEmitter from '../';

test('emit', () => {
  let fired = false;
  const ee = new EventEmitter;
  ee.addListener('a', result => { fired = true });
  ee.emit('a');
  expect(fired).toBe(true);
});

test('emitWithArgs', () => {
  let fired;
  const ee = new EventEmitter;
  ee.addListener('a', (a, b, c) => { fired = [a, b, c]; });
  ee.emit('a', 1, 2, 3);
  expect(fired).toEqual([1, 2, 3]);
});

test('removeListener', () => {
  let fired = false;
  const ee = new EventEmitter;
  const listener = result => { fired = true };

  ee.addListener('a', listener);
  ee.emit('a');
  expect(fired).toBe(true);

  fired = false;
  ee.removeListener('a', listener);
  ee.emit('a');
  expect(fired).toBe(false);

  ee.addListener('a', listener).remove();
  ee.emit('a');
  expect(fired).toBe(false);
});

test('removeAllListeners', () => {
  let aFired = 0;
  let bFired = false;
  const ee = new EventEmitter;

  // remove all listeners on particular eventType
  ee.addListener('a', () => { aFired++; });
  ee.addListener('a', () => { aFired++; });
  ee.addListener('b', () => { bFired = true; });
  ee.removeAllListeners('a');
  ee.emit('a');
  ee.emit('b');
  expect(aFired).toBe(0);
  expect(bFired).toBe(true);

  // remove all listeners attached to emitter
  bFired = false;
  ee.removeAllListeners();
  ee.emit('b');
  expect(bFired).toBe(false);
});

test('multiListener', () => {
  let fired = 0;
  const ee = new EventEmitter;

  ee.addListener('a', () => { fired++; });
  ee.addListener('a', () => { fired++; });
  ee.emit('a');
  expect(fired).toBe(2);
});

test('noDupListen', () => {
  let emited = 0;
  const ee = new EventEmitter;
  const listener = result => { emited++ };

  ee.addListener('a', listener);
  ee.addListener('a', listener);
  ee.emit('a');
  expect(emited).toBe(1);
});
