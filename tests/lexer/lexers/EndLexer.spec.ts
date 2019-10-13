import { createLexer } from "../../helper/lexer/CreateLexer";
import { EndLexer } from "lexer/lexers/EndLexer";
import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { LexerTokenTypes } from "token";

describe("EndLexer", () => {
  describe("매치 되는 경우", () => {
    it(".으로 끝날 때", () => {
      const code = ".";
      const endLexer = createLexer(EndLexer, code);
      const result = endLexer.parse(0);

      if (compareTokenType(result, LexerTokenTypes.END)) {
        expect(result.endType).to.equal("dot");
        expect(result.index).to.deep.equal({ start: 0, end: code.length });
      }
    });

    it("띄어쓰기로 끝날 때", () => {
      const code = "\n";
      const endLexer = createLexer(EndLexer, code);
      const result = endLexer.parse(0);

      if (compareTokenType(result, LexerTokenTypes.END)) {
        expect(result.endType).to.equal("newLine");
        expect(result.index).to.deep.equal({ start: 0, end: code.length });
      }
    });
  });
  describe("매치 되지 않는 경우", () => {
    it("일반 텍스트일 때", () => {
      const endLexer = createLexer(EndLexer, "기");
      const result = endLexer.parse(0);

      expect(result).to.be.not.ok;
    });

    // 이전 단계에서 \r\n을 \n으로 압축됨
    it("crlf일 때", () => {
      const endLexer = createLexer(EndLexer, "\r\n");
      const result = endLexer.parse(0);

      expect(result).to.be.not.ok;
    });
  });
});
