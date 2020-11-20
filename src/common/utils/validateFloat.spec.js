import proxyquire from 'proxyquire';
import { should } from "chai";
should();

describe('validateFloat(value', () => {
  let validateFloat;

  before(() => {
    validateFloat = proxyquire.noCallThru()
      .load('./validateFloat', {})
      .default;
  });

  it('should return a number when passed a number in a string', () => {
    validateFloat('12').should.eql(12);
  });

  it('should include decimal values', () => {
    validateFloat('12.12').should.eql(12.12);
  });

  it('should ignore letters after', () => {
    validateFloat('12.12aa').should.eql(12.12);
  });

  it('should return zero if cannot parse the number', () => {
    validateFloat('aaa').should.eql(0);
  });
});
