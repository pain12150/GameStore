import { KeyFormatPipe } from './key-format-pipe';

describe('KeyFormatPipe', () => {
  let pipe: KeyFormatPipe;

  beforeEach(() => {
    pipe = new KeyFormatPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform lowercase alphanumeric string to hyphenated uppercase blocks', () => {
    expect(pipe.transform('a3f9b21c4de7')).toBe('A3F9-B21C-4DE7');
  });

  it('should clean existing hyphens and format correctly', () => {
    expect(pipe.transform('a3f9-b21c-4de7')).toBe('A3F9-B21C-4DE7');
  });

  it('should handle uneven string lengths correctly', () => {
    expect(pipe.transform('a3f9b')).toBe('A3F9-B');
  });

  it('should return empty string if input is undefined or empty', () => {
    expect(pipe.transform(undefined)).toBe('');
    expect(pipe.transform('')).toBe('');
  });
});
