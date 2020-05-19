import { should } from "chai";
should();

import toPercent from "./toPercent";

describe('toPercent()', () => {
  it('should convert value to percentage', () => {
    toPercent(16).should.equal(.16);
  });

  it('should convert value to percentage', () => {
    toPercent(1600).should.equal(16);
  });

  it('should convert a non-integer value to 0', () => {
    toPercent(.16).should.equal(0.0016);
  });
});
