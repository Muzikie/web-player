import { secondToMinutes } from './convertors';

describe('secondToMinutes', () => {
  it('should convert 60 seconds to 1:00', () => {
    expect(secondToMinutes(60)).toBe('1:00');
  });

  it('should convert 45 seconds to 1:00', () => {
    expect(secondToMinutes(45)).toBe('0:45');
  });
});
