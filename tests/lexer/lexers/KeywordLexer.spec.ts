import { KeywordList } from "lexer/lexers/models/KeywordList";
import { createLexer } from "../../helper/lexer/CreateLexer";
import { KeywordLexer } from "lexer/lexers/KeywordLexer";
import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { TokenTypes } from "token";
import { OperatorList } from "lexer/lexers/models/OperatorList";

describe("KeywordLexer", () => {
  describe("매치 되는 경우", () => {
    it("단어가 모두 일치", () => {
      const code = KeywordList.map(keyword => keyword.match).join(" ");
      const keywordLexer = createLexer(KeywordLexer, code);

      let index = 0;
      for (let i = 0; i < KeywordList.length; i++) {
        const result = keywordLexer.parse(index);

        if (compareTokenType(result, TokenTypes.KEYWORD)) {
          expect(result.name).to.be.equal(KeywordList[i].name);
          expect(
            code.substring(result.index.start, result.index.end)
          ).to.be.equal(KeywordList[i].match);
          index = result.index.end + 1;
        }
      }
    });

    it("단어 뒤에 특수기호가 붙었을 때", () => {
      const code = KeywordList.map(
        (keyword, index) =>
          keyword.match + OperatorList[index % OperatorList.length]
      ).join(" ");
      const keywordLexer = createLexer(KeywordLexer, code);

      let index = 0;
      for (let i = 0; i < KeywordList.length; i++) {
        const result = keywordLexer.parse(index);

        if (compareTokenType(result, TokenTypes.KEYWORD)) {
          expect(result.name).to.be.equal(KeywordList[i].name);
          expect(
            code.substring(result.index.start, result.index.end)
          ).to.be.equal(KeywordList[i].match);
          // 뒤에 추가로 붙은 Operator 길이를 더함
          index = result.index.end + 2;
        }
      }
    });
  });
  describe("매치 되지 않는 경우", () => {
    it("단어 뒤에 특수기호가 아닌 문자가 붙었을 때", () => {
      const keywordLexer = createLexer(
        KeywordLexer,
        KeywordList[0].match + "1"
      );

      const result = keywordLexer.parse(0);

      expect(result).to.be.not.ok;
    });
    it("사전에 없는 단어가 붙었을 때", () => {
      const keywordLexer = createLexer(KeywordLexer, "키워드아님");

      const result = keywordLexer.parse(0);

      expect(result).to.be.not.ok;
    });
  });
});
