import { createLexer } from "../../helper/lexer/CreateLexer";
import { RawCodeLexer } from "lexer/lexers/RawCodeLexer";
import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { TokenTypes } from "token";
import { ErrorCode } from "lexer/error/ErrorCode";

describe("RawCodeLexer", () => {
  describe("매치 되는 경우", () => {
    it("코드일 때", () => {
      const rawCodeLexer = createLexer(RawCodeLexer, "`code test`");
      const result = rawCodeLexer.parse(0);

      if (compareTokenType(result, TokenTypes.RAWCODE)) {
        expect(result.code).to.equal("code test");
      }
    });
  });

  describe("매치 되지 않는 경우", () => {
    it("코드가 아닐 때", () => {
      const rawCodeLexer = createLexer(RawCodeLexer, "code");
      const result = rawCodeLexer.parse(0);

      expect(result).to.be.not.ok;
    });

    it("코드가 끝나지 않을 때", () => {
      const rawCodeLexer = createLexer(RawCodeLexer, "`code test");
      expect(() => {
        rawCodeLexer.parse(0);
      }).to.be.throw(ErrorCode.RAWCODE_NOT_END);
    });
  });
});
