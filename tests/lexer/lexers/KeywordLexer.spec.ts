import { KeywordLexer } from "lexer/lexers/KeywordLexer";
import { keywordList } from "lexer/lexers/models/KeywordList";
import { operatorList } from "lexer/lexers/models/OperatorList";
import snapshot = require("snap-shot-it");
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

import { expectTokenType } from "../../helper/lexer/CompareTokenType";
import { createLexer } from "../../helper/lexer/CreateLexer";

describe("KeywordLexer", function() {
  describe("매치 되는 경우", function() {
    it("단어가 모두 일치할 때", function() {
      const code = keywordList.map(keyword => keyword.match).join(" ");
      const keywordLexer = createLexer(KeywordLexer, code);

      let index = 0;
      for (const keyword of keywordList) {
        const result = keywordLexer.parse(index);

        expectTokenType(result, LexerTokenTypes.KEYWORD);
        expect(result.name).to.equal(keyword.name);
        expect(code.substring(result.index.start, result.index.end)).to.equal(
          keyword.match,
        );
        snapshot(result);
        index = result.index.end + 1;
      }
    });

    it("단어 뒤에 특수기호가 붙었을 때", function() {
      const code = keywordList
        .map(
          (keyword, index) =>
            keyword.match + operatorList[index % operatorList.length],
        )
        .join(" ");
      const keywordLexer = createLexer(KeywordLexer, code);

      let index = 0;
      for (const keyword of keywordList) {
        const result = keywordLexer.parse(index);

        expectTokenType(result, LexerTokenTypes.KEYWORD);
        expect(result.name).to.equal(keyword.name);
        expect(code.substring(result.index.start, result.index.end)).to.equal(
          keyword.match,
        );
        snapshot(result);
        // 뒤에 추가로 붙은 Operator 길이를 더함
        index = result.index.end + 2;
      }
    });
  });
  describe("매치 되지 않는 경우", function() {
    it("단어 뒤에 특수기호가 아닌 문자가 붙었을 때", function() {
      const keywordLexer = createLexer(
        KeywordLexer,
        keywordList[0].match + "1",
      );

      const result = keywordLexer.parse(0);

      expect(result).to.be.not.exist;
    });
    it("사전에 없는 단어가 붙었을 때", function() {
      const keywordLexer = createLexer(KeywordLexer, "키워드아님");

      const result = keywordLexer.parse(0);

      expect(result).to.be.not.exist;
    });
  });
});
