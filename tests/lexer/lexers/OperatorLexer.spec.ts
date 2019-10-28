import { createLexer } from "../../helper/lexer/CreateLexer";
import { OperatorLexer } from "lexer/lexers/OperatorLexer";
import { operatorList } from "lexer/lexers/models/OperatorList";
import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import snapshot = require("snap-shot-it");

describe("OperatorLexer", () => {
  describe("매치 되는 경우", () => {
    it("연산자가 모두 일치할 때", () => {
      const code = operatorList.join("");
      const operatorLexer = createLexer(OperatorLexer, code);

      for (let i = 0; i < operatorList.length; i++) {
        const result = operatorLexer.parse(i);

        if (compareTokenType(result, LexerTokenTypes.OPERATOR)) {
          snapshot(result);
          expect(result.operator).to.equal(operatorList[i]);
        }
      }
    });

    it("연산자 뒤에 한글이 붙을 때", () => {
      const code = operatorList.join("가");
      const operatorLexer = createLexer(OperatorLexer, code);

      let searchIndex = 0;
      for (const operator of operatorList) {
        const result = operatorLexer.parse(searchIndex);
        if (compareTokenType(result, LexerTokenTypes.OPERATOR)) {
          snapshot(result);
          expect(result.operator).to.equal(operator);
          searchIndex = result.index.end + 1;
        }
      }
    });
  });
  describe("매치 되지 않는 경우", () => {
    it("연산자가 아닐 때", () => {
      const operatorLexer = createLexer(OperatorLexer, "text");
      const result = operatorLexer.parse(0);

      expect(result).to.be.not.ok;
    });
  });
});
