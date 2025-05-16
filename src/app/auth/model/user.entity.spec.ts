import { User } from './user.entity';

describe('User', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new User()).toBeTruthy();
  });
});
