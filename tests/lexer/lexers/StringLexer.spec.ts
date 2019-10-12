import { createLexer } from "../../helper/lexer/CreateLexer";
import { StringLexer } from "lexer/lexers/StringLexer";
import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { TokenTypes } from "token";
import { ErrorCode } from "lexer/error/ErrorCode";

describe("StringLexer", () => {
  describe("매치 되는 경우", () => {
    it("문자열일 때", () => {
      const stringLexer = createLexer(StringLexer, `"string"`);
      const result = stringLexer.parse(0);

      if (compareTokenType(result, TokenTypes.STRING)) {
        expect(result.string).to.equal("string");
      }
    });
  });

  describe("매치 되지 않는 경우", () => {
    it("문자열이 아닐 때", () => {
      const stringLexer = createLexer(StringLexer, "string");
      const result = stringLexer.parse(0);

      expect(result).to.be.not.ok;
    });

    it("문자열이 끝나지 않을 때", () => {
      const stringLexer = createLexer(StringLexer, `"string`);
      expect(() => {
        stringLexer.parse(0);
      }).to.be.throw(ErrorCode.STRING_NOT_END);
    });
  });
});
