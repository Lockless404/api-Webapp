import itemsCounter from '../__mocks__/itemsCounter.js';

test('should return 0 for the length of the array = 0', () => {
  const arr = [];
  expect(itemsCounter(arr)).toBe(0);
});

test('should return the length of the array = 6', () => {
  const arr = [{
    id: '1000',
  }, {
    id: '1002',
  }, {
    id: '1003',
  }, {
    id: '1015',
  }, {
    id: '1021',
  }, {
    id: '1022',
  },
  ];
  expect(itemsCounter(arr)).toBe(6);
});
