/**
 * @jest-environment jsdom
 */
import CommentsPopUp from '../comments';

jest.setTimeout(10000);
const comments = new CommentsPopUp();
describe('Count comments', () => {
  test('Add new comment, expect new total comments to exceed initial comments count', async () => {
    const initalTotal = await comments.total(1022);
    await comments.add('1022', 'UserTest', 'test comment');
    const resultb = await comments.total(1022);
    expect(resultb).toBeGreaterThan(initalTotal);
  });
  test('Expect total comments not to change when no new item is added', async () => {
    const initalTotal = await comments.total(1022);
    const resultb = await comments.total(1022);
    expect(resultb).toEqual(initalTotal);
  });
});