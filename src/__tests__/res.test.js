import { getCount } from '../res.js';

describe('Tests for number of reservers', () => {
  test('Expect function to return the number of reservers', () => {
    const reservers = [];
    expect(getCount(reservers)).toBe(0);
  });

  test('Expect function to return the number of reservers', () => {
    const reservers = [
      {
        username: 'Alvin',
        date_start: 0 / 0 / 0,
        date_end: 1 / 1 / 1,
        item_id: 1122,
      },
      {
        username: 'Klvin',
        date_start: 1 / 0 / 0,
        date_end: 1 / 1 / 1,
        item_id: 1123,
      },
      {
        username: 'Malvin',
        date_start: 0 / 1 / 0,
        date_end: 1 / 1 / 1,
        item_id: 122,
      },
    ];
    expect(getCount(reservers)).toBe(3);
  });
});
