import { TokenTypes } from "token";

import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { createLexer } from "../../helper/lexer/CreateLexer";
import { IndentLexer, IndentToken } from "lexer/lexers/IndentLexer";
import { EndToken } from "lexer/lexers/EndLexer";
import { mockToken } from "../../helper/lexer/MockToken";

describe("IndentLexer", () => {
  describe("매치되는 경우", () => {
    it("tab을 사용할 때 (tab전에 아무것도 없을 때)", () => {
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

  describe("reduceIndent 함수", () => {
    const mockIndentToken = mockToken<IndentToken>(TokenTypes.INDENT, {
      tabType: "tab"
    });
    const mockEndToken = mockToken<EndToken>(TokenTypes.END, {
      endType: "\n"
    });
    const mockEndDotToken = mockToken<EndToken>(TokenTypes.END, {
      endType: "."
    });

    it("유효한 Indent 토큰일 때", () => {
      const tokens = IndentLexer.reduceIndent([
        mockEndToken,
        mockIndentToken,
        mockIndentToken
      ]);

      expect(tokens.length).to.be.equal(3);
    });

    it("유효한 Indent 토큰일 때2", () => {
      const tokens = IndentLexer.reduceIndent([
        mockEndDotToken,
        mockIndentToken,
        mockIndentToken,
        mockEndToken,
        mockIndentToken,
        mockIndentToken
      ]);

      expect(tokens.length).to.be.equal(4);
    });

    it("유효하지 않은 Indent 토큰일 때", () => {
      const tokens = IndentLexer.reduceIndent([
        mockEndDotToken,
        mockIndentToken,
        mockIndentToken
      ]);

      expect(tokens.length).to.be.equal(1);
    });
  });
});
