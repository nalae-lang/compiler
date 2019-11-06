import { LexerErrorCode } from "lexer/error/ErrorCode";
import { StringLexer } from "lexer/lexers/StringLexer";
import snapshot = require("snap-shot-it");
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { createLexer } from "../../helper/lexer/CreateLexer";

describe("StringLexer", function() {
  describe("매치 되는 경우", function() {
    it("문자열일 때", function() {
      const code = `"string"`;
      const stringLexer = createLexer(StringLexer, code);
      const result = stringLexer.parse(0);

      if (compareTokenType(result, LexerTokenTypes.STRING)) {
        expect(result.string).to.equal("string");
        expect(result.index).to.deep.equal({ start: 0, end: code.length });
        snapshot(result);
      }
    });
  });

  describe("매치 되지 않는 경우", function() {
    it("문자열이 아닐 때", function() {
      const stringLexer = createLexer(StringLexer, "string");
      const result = stringLexer.parse(0);

      expect(result).to.be.not.exist;
    });

    it("문자열이 끝나지 않을 때", function() {
      const stringLexer = createLexer(StringLexer, `"string`);
      expect(function() {
        stringLexer.parse(0);
      }).to.be.throw(LexerErrorCode.STRING_NOT_END);
    });
  });
});
