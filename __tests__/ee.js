import EventEmitter from '../';

test('emit', () => {
  let fired = false;
  const ee = new EventEmitter;
  ee.on('a', result => { fired = true });
  ee.emit('a');
  expect(fired).toBe(true);
});

test('emitWithArgs', () => {
  let fired;
  const ee = new EventEmitter;
  ee.on('a', (a, b, c) => { fired = [a, b, c]; });
  ee.emit('a', 1, 2, 3);
  expect(fired).toEqual([1, 2, 3]);
});

test('removeListener', () => {
  let fired = false;
  const ee = new EventEmitter;
  const listener = result => { fired = true };

  ee.on('a', listener).remove();
  ee.emit('a');
  expect(fired).toBe(false);
});

test('multiListener', () => {
  let fired = 0;
  const ee = new EventEmitter;

  ee.on('a', () => { fired++; });
  ee.on('a', () => { fired++; });
  ee.emit('a');
  expect(fired).toBe(2);
});

test('once', () => {
  let emited = 0;
  const ee = new EventEmitter;
  const listener = result => { emited++ };

  ee.once('a', listener);
  ee.emit('a');
  ee.emit('a');
  expect(emited).toBe(1);
});

test('oncePromise', () => {
  let emited = 0;
  const ee = new EventEmitter;
  const listener = result => { emited++ };

  ee.once('a', listener).then(() => expect(emited).toBe(1));
});
