import { IndentLexer } from "lexer/lexers/IndentLexer";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

import { expectTokenType } from "../../helper/lexer/CompareTokenType";
import { createLexer } from "../../helper/lexer/CreateLexer";
import snapshot = require("snap-shot-it");

describe("IndentLexer", function () {
  describe("매치되는 경우", function () {
    it("tab을 사용할 때 (tab전에 아무것도 없을 때)", function () {
      const indentLexer = createLexer(IndentLexer, "\tvalue");
      const result = indentLexer.parse(0);

      expectTokenType(result, LexerTokenTypes.INDENT);
      expect(result.indentType).to.equal("tab");
      expect(result.index).to.deep.equal({ start: 0, end: 1 });
      snapshot(result);
    });

    it("스페이스를 사용할 때", function () {
      const indentLexer = createLexer(IndentLexer, "  value");
      const result = indentLexer.parse(0);

      expectTokenType(result, LexerTokenTypes.INDENT);
      expect(result.indentType).to.equal("space");
      expect(result.index).to.deep.equal({ start: 0, end: 2 });
      snapshot(result);
    });
  });

  describe("매치되지 않는 경우", function () {
    it("스페이스가 하나일 때", function () {
      const indentLexer = createLexer(IndentLexer, " value");
      const result = indentLexer.parse(0);

      expect(result).to.be.not.exist;
    });
  });
});
