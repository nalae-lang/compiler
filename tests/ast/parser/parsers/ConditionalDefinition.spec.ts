import { ParserTokenTypes } from "ast/types/ParserTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

import {
  mockKeyword,
  mockNumber,
  mockOperator,
  mockSubject,
} from "tests/helper/lexer/MockToken";
import { ConditionalDefinitionParser } from "ast/parser/parsers";
import { expectTokenType } from "tests/helper/lexer/CompareTokenType";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import snapshot from "snap-shot-it";

describe("ConditionalDefinition", function () {
  describe("매치될 때", function () {
    it("'키가 30이상이면,' 일 때", function () {
      const mockTokens = [
        mockSubject("키가"),
        mockNumber(30),
        mockKeyword(">="),
        mockOperator(","),
      ];
      const result = ConditionalDefinitionParser(mockTokens, 0);

      expectTokenType(result, ParserTokenTypes.CONDITIONAL_EXPRESSION);
      expectTokenType(result.leftValue, MorphemeTokenTypes.IDENTIFIER);
      expect(result.leftValue.name).to.equal("키");
      expectTokenType(result.rightValue, LexerTokenTypes.NUMBER);
      expect(result.rightValue.number).to.equal(30);

      snapshot(result);
    });
  });
});
