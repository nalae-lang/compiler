import { isKorean } from "utils/IsKorean";

describe("utils/IsKorean", function() {
  it("한국어일 때", function() {
    expect(isKorean("가")).to.be.true;
  });

  it("한국어가 아닐 때", function() {
    expect(isKorean("a")).to.be.false;
  });
});
