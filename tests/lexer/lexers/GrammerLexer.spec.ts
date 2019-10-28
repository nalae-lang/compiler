import { LexerTokenTypes } from "token/types/LexerTokenTypes";

import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { createLexer } from "../../helper/lexer/CreateLexer";
import { GrammerLexer } from "lexer/lexers/GrammerLexer";
import snapshot = require("snap-shot-it");

describe("GrammerLexer", () => {
  describe("매치되는 경우", () => {
    it("한글만 존재할 때", () => {
      const code = "변수";
      const grammerLexer = createLexer(GrammerLexer, code);
      const result = grammerLexer.parse(0);

      if (compareTokenType(result, LexerTokenTypes.GRAMMER)) {
        snapshot(result);
        expect(result.text).to.equal(code);
        expect(result.index).to.deep.equal({ start: 0, end: code.length });
      }
    });

    it("영어만 존재할 때", () => {
      const code = "testVariable";
      const grammerLexer = createLexer(GrammerLexer, code);
      const result = grammerLexer.parse(0);

      if (compareTokenType(result, LexerTokenTypes.GRAMMER)) {
        snapshot(result);
        expect(result.text).to.equal(code);
        expect(result.index).to.deep.equal({ start: 0, end: code.length });
      }
    });

    it("영어 + 한글 + _", () => {
      const code = "test_변수";
      const grammerLexer = createLexer(GrammerLexer, code);
      const result = grammerLexer.parse(0);

      if (compareTokenType(result, LexerTokenTypes.GRAMMER)) {
        snapshot(result);
        expect(result.text).to.equal(code);
        expect(result.index).to.deep.equal({ start: 0, end: code.length });
      }
    });

    it("_로 시작", () => {
      const code = "_variable";
      const grammerLexer = createLexer(GrammerLexer, code);
      const result = grammerLexer.parse(0);

      if (compareTokenType(result, LexerTokenTypes.GRAMMER)) {
        snapshot(result);
        expect(result.text).to.equal(code);
        expect(result.index).to.deep.equal({ start: 0, end: code.length });
      }
    });

    it("한글 + 숫자", () => {
      const code = "변수2";
      const grammerLexer = createLexer(GrammerLexer, code);
      const result = grammerLexer.parse(0);

      if (compareTokenType(result, LexerTokenTypes.GRAMMER)) {
        snapshot(result);
        expect(result.text).to.equal(code);
        expect(result.index).to.deep.equal({ start: 0, end: code.length });
      }
    });
  });

  describe("매치되지 않는 경우", () => {
    it("숫자로 시작할 때", () => {
      const grammerLexer = createLexer(GrammerLexer, "3변수");
      const result = grammerLexer.parse(0);
      expect(result).to.be.not.ok;
    });
  });
});
