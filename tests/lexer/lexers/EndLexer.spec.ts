import { createLexer } from "../../helper/lexer/CreateLexer";
import { EndLexer } from "lexer/lexers/EndLexer";
import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { TokenTypes } from "token";

describe("EndLexer", () => {
  describe("매치 되는 경우", () => {
    it(".으로 끝날 때", () => {
      const endLexer = createLexer(EndLexer, ".");
      const result = endLexer.parse(0);

      if (compareTokenType(result, TokenTypes.END)) {
        expect(result.endType).to.equal(".");
      }
    });

    it("띄어쓰기로 끝날 때", () => {
      const endLexer = createLexer(EndLexer, "\n");
      const result = endLexer.parse(0);

      if (compareTokenType(result, TokenTypes.END)) {
        expect(result.endType).to.equal("\n");
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
