import { mockNumber, mockOperator } from "../../../helper/lexer/MockToken";

describe("ExpressionToken", function() {
  it("1 + 2 + 4일 때", function() {
    const mockExpressions = [
      mockNumber(1),
      mockOperator("+"),
      mockNumber(2),
      mockOperator("+"),
      mockNumber(4)
    ];


  })
})