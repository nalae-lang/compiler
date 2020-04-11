import { LexerErrorCode } from "lexer/error/ErrorCode";
import { RawCodeLexer } from "lexer/lexers/RawCodeLexer";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

import { expectTokenType } from "../../helper/lexer/CompareTokenType";
import { createLexer } from "../../helper/lexer/CreateLexer";
import snapshot = require("snap-shot-it");

describe("RawCodeLexer", function () {
  describe("매치 되는 경우", function () {
    it("코드일 때", function () {
      const code = "`code test`";
      const rawCodeLexer = createLexer(RawCodeLexer, code);
      const result = rawCodeLexer.parse(0);

      expectTokenType(result, LexerTokenTypes.RAWCODE);
      expect(result.code).to.equal("code test");
      expect(result.index).to.deep.equal({ start: 0, end: code.length });
      snapshot(result);
    });
  });

  describe("매치 되지 않는 경우", function () {
    it("코드가 아닐 때", function () {
      const rawCodeLexer = createLexer(RawCodeLexer, "code");
      const result = rawCodeLexer.parse(0);

      expect(result).to.be.not.exist;
    });

    it("코드가 끝나지 않을 때", function () {
      const rawCodeLexer = createLexer(RawCodeLexer, "`code test");
      expect(function () {
        rawCodeLexer.parse(0);
      }).to.be.throw(LexerErrorCode.RAWCODE_NOT_END);
    });
  });
});
