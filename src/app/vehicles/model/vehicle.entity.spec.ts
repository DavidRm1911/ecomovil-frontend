import { Vehicle } from './vehicle.entity';

describe('Vehicle', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new Vehicle()).toBeTruthy();
  });
});
