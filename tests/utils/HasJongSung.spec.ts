import { hasJongSung } from "utils/HasJongSung";

describe("utils/HasJongSung", function () {
  it("종성이 있을 때", function () {
    expect(hasJongSung("각")).to.be.true;
  });

  it("종성이 없을 때", function () {
    expect(hasJongSung("가")).to.be.false;
  });
});
