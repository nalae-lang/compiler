import { TokenTypes } from "token";

import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { createLexer } from "../../helper/lexer/CreateLexer";
import { IndentLexer } from "lexer/lexers/IndentLexer";

describe("IndentLexer", () => {
  describe("매치되는 경우", () => {
    it("tab을 사용할 때", () => {
      const indentLexer = createLexer(IndentLexer, "\tvalue");
      const result = indentLexer.parse(0);

      if (compareTokenType(result, TokenTypes.INDENT)) {
        expect(result.tabType).to.be.equal("tab");
      }
    });

    it("스페이스를 사용할 때", () => {
      const indentLexer = createLexer(IndentLexer, "  value");
      const result = indentLexer.parse(0);

      if (compareTokenType(result, TokenTypes.INDENT)) {
        expect(result.tabType).to.be.equal("space");
      }
    });
  });

  describe("매치되지 않는 경우", () => {
    it("스페이스가 하나일 때", () => {
      const indentLexer = createLexer(IndentLexer, " value");
      const result = indentLexer.parse(0);

      expect(result).to.be.not.ok;
    });
  });
});
