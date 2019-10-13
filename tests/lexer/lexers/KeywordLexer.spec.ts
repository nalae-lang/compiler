import { keywordList } from "lexer/lexers/models/KeywordList";
import { createLexer } from "../../helper/lexer/CreateLexer";
import { KeywordLexer } from "lexer/lexers/KeywordLexer";
import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { LexerTokenTypes } from "token";
import { operatorList } from "lexer/lexers/models/OperatorList";

describe("KeywordLexer", () => {
  describe("매치 되는 경우", () => {
    it("단어가 모두 일치할 때", () => {
      const code = keywordList.map(keyword => keyword.match).join(" ");
      const keywordLexer = createLexer(KeywordLexer, code);

      let index = 0;
      for (let i = 0; i < keywordList.length; i++) {
        const result = keywordLexer.parse(index);

        if (compareTokenType(result, LexerTokenTypes.KEYWORD)) {
          expect(result.name).to.equal(keywordList[i].name);
          expect(code.substring(result.index.start, result.index.end)).to.equal(
            keywordList[i].match
          );
          index = result.index.end + 1;
        }
      }
    });

    it("단어 뒤에 특수기호가 붙었을 때", () => {
      const code = keywordList
        .map(
          (keyword, index) =>
            keyword.match + operatorList[index % operatorList.length]
        )
        .join(" ");
      const keywordLexer = createLexer(KeywordLexer, code);

      let index = 0;
      for (let i = 0; i < keywordList.length; i++) {
        const result = keywordLexer.parse(index);

        if (compareTokenType(result, LexerTokenTypes.KEYWORD)) {
          expect(result.name).to.equal(keywordList[i].name);
          expect(code.substring(result.index.start, result.index.end)).to.equal(
            keywordList[i].match
          );
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
        keywordList[0].match + "1"
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
