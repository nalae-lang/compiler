import { TokenTypes } from "token";

import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { createLexer } from "../../helper/lexer/CreateLexer";
import { GrammerLexer } from "lexer/lexers/GrammerLexer";

describe("GrammerLexer", () => {
  describe("매치되는 경우", () => {
    it("한글만 존재할 때", () => {
      const grammerLexer = createLexer(GrammerLexer, "변수");
      const result = grammerLexer.parse(0);

      if (compareTokenType(result, TokenTypes.GRAMMER)) {
        expect(result.text).to.equal("변수");
      }
    });

    it("영어만 존재할 때", () => {
      const grammerLexer = createLexer(GrammerLexer, "testVariable");
      const result = grammerLexer.parse(0);

      if (compareTokenType(result, TokenTypes.GRAMMER)) {
        expect(result.text).to.equal("testVariable");
      }
    });

    it("영어 + 한글 + _", () => {
      const grammerLexer = createLexer(GrammerLexer, "test_변수");
      const result = grammerLexer.parse(0);

      if (compareTokenType(result, TokenTypes.GRAMMER)) {
        expect(result.text).to.equal("test_변수");
      }
    });

    it("_로 시작", () => {
      const grammerLexer = createLexer(GrammerLexer, "_variable");
      const result = grammerLexer.parse(0);

      if (compareTokenType(result, TokenTypes.GRAMMER)) {
        expect(result.text).to.equal("_variable");
      }
    });

    it("한글 + 숫자", () => {
      const grammerLexer = createLexer(GrammerLexer, "변수2");
      const result = grammerLexer.parse(0);

      if (compareTokenType(result, TokenTypes.GRAMMER)) {
        expect(result.text).to.equal("변수2");
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
