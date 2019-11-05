import { LexerErrorCode } from "lexer/error/ErrorCode";
import { RawCodeLexer } from "lexer/lexers/RawCodeLexer";
import snapshot = require("snap-shot-it");
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { createLexer } from "../../helper/lexer/CreateLexer";

describe("RawCodeLexer", () => {
  describe("매치 되는 경우", () => {
    it("코드일 때", () => {
      const code = "`code test`";
      const rawCodeLexer = createLexer(RawCodeLexer, code);
      const result = rawCodeLexer.parse(0);

      if (compareTokenType(result, LexerTokenTypes.RAWCODE)) {
        expect(result.code).to.equal("code test");
        expect(result.index).to.deep.equal({ start: 0, end: code.length });
        snapshot(result);
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
      }).to.be.throw(LexerErrorCode.RAWCODE_NOT_END);
    });
  });
});
