import { NumberLexer } from "lexer/lexers/NumberLexer";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

import { expectTokenType } from "../../helper/lexer/CompareTokenType";
import { createLexer } from "../../helper/lexer/CreateLexer";
import snapshot = require("snap-shot-it");

function testValidNumber(code: string, expectNumber: number): () => void {
  return function (): void {
    const numberLexer = createLexer(NumberLexer, code);
    const result = numberLexer.parse(0);

    expectTokenType(result, LexerTokenTypes.NUMBER);
    expect(result.number).to.equal(expectNumber);
    expect(result.index).to.deep.equal({ start: 0, end: code.length });
    snapshot(result);
  };
}

describe("NumberLexer", function () {
  describe("매치 되는 경우", function () {
    it("10진수일 때", testValidNumber("10", 10));

    it("음수인 10진수일 때", testValidNumber("-10", -10));

    it("10진수 실수형일 때", testValidNumber("10.132", 10.132));

    it("음수인 10진수 실수형일 때", testValidNumber("-10.132", -10.132));

    it("0일 때", testValidNumber("0", 0));
  });

  describe("매치 되지 않을 때", function () {
    it("숫자가 아닐 때", function () {
      const numberLexer = createLexer(NumberLexer, "text");
      const result = numberLexer.parse(0);

      expect(result).to.be.not.exist;
    });
  });
});
