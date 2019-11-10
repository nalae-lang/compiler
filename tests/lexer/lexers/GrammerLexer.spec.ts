import { GrammerLexer } from "lexer/lexers/GrammerLexer";
import snapshot = require("snap-shot-it");
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

import { expectTokenType } from "../../helper/lexer/CompareTokenType";
import { createLexer } from "../../helper/lexer/CreateLexer";

describe("GrammerLexer", function() {
  describe("매치되는 경우", function() {
    it("한글만 존재할 때", function() {
      const code = "변수";
      const grammerLexer = createLexer(GrammerLexer, code);
      const result = grammerLexer.parse(0);

      expectTokenType(result, LexerTokenTypes.GRAMMAR);
      expect(result.text).to.equal(code);
      expect(result.index).to.deep.equal({ start: 0, end: code.length });
      snapshot(result);
    });

    it("영어만 존재할 때", function() {
      const code = "testVariable";
      const grammerLexer = createLexer(GrammerLexer, code);
      const result = grammerLexer.parse(0);

      expectTokenType(result, LexerTokenTypes.GRAMMAR);
      expect(result.text).to.equal(code);
      expect(result.index).to.deep.equal({ start: 0, end: code.length });
      snapshot(result);
    });

    it("영어 + 한글 + _", function() {
      const code = "test_변수";
      const grammerLexer = createLexer(GrammerLexer, code);
      const result = grammerLexer.parse(0);

      expectTokenType(result, LexerTokenTypes.GRAMMAR);
      expect(result.text).to.equal(code);
      expect(result.index).to.deep.equal({ start: 0, end: code.length });
      snapshot(result);
    });

    it("_로 시작", function() {
      const code = "_variable";
      const grammerLexer = createLexer(GrammerLexer, code);
      const result = grammerLexer.parse(0);

      expectTokenType(result, LexerTokenTypes.GRAMMAR);
      expect(result.text).to.equal(code);
      expect(result.index).to.deep.equal({ start: 0, end: code.length });
      snapshot(result);
    });

    it("한글 + 숫자", function() {
      const code = "변수2";
      const grammerLexer = createLexer(GrammerLexer, code);
      const result = grammerLexer.parse(0);

      expectTokenType(result, LexerTokenTypes.GRAMMAR);
      expect(result.text).to.equal(code);
      expect(result.index).to.deep.equal({ start: 0, end: code.length });
      snapshot(result);
    });
  });

  describe("매치되지 않는 경우", function() {
    it("숫자로 시작할 때", function() {
      const grammerLexer = createLexer(GrammerLexer, "3변수");
      const result = grammerLexer.parse(0);
      expect(result).to.be.not.exist;
    });
  });
});
