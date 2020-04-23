import { isValueToken } from "utils/IsValueToken";
import { mockIndent, mockString } from "tests/helper/lexer/MockToken";

describe("utils/IsValueToken", function () {
  it("StringToken일 때", function () {
    expect(isValueToken(mockString(""))).to.equals(true);
  });

  it("IndentToken일 때", function () {
    expect(isValueToken(mockIndent("space"))).to.equals(false);
  });

  it("undefined일 때", function () {
    expect(isValueToken(undefined)).to.equals(false);
  });
});
