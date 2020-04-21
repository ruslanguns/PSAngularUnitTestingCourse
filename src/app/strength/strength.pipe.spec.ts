import { StrengthPipe } from "./strength.pipe";

describe('strength pipe', () => {
  const pipe = new StrengthPipe();

  it('should display weak if strenth is 5', () => {
    expect(pipe.transform(5)).toEqual('5 (weak)');
  });

  it('should display string if strenth is 10', () => {
    expect(pipe.transform(10)).toEqual('10 (strong)');
  });

  it('should display string if strenth is 10', () => {
    expect(pipe.transform(10)).toEqual('10 (strong)');
  });
});
