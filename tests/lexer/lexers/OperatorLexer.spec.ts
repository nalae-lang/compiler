import { operatorList } from "lexer/lexers/models/OperatorList";
import { OperatorLexer } from "lexer/lexers/OperatorLexer";
import snapshot = require("snap-shot-it");
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { createLexer } from "../../helper/lexer/CreateLexer";

describe("OperatorLexer", () => {
  describe("매치 되는 경우", () => {
    it("연산자가 모두 일치할 때", () => {
      const code = operatorList.join("");
      const operatorLexer = createLexer(OperatorLexer, code);

      for (let i = 0; i < operatorList.length; i++) {
        const result = operatorLexer.parse(i);

        if (compareTokenType(result, LexerTokenTypes.OPERATOR)) {
          expect(result.operator).to.equal(operatorList[i]);
          snapshot(result);
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
          expect(result.operator).to.equal(operator);
          snapshot(result);
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
