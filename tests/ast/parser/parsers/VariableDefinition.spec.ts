import { VariableDefinitionParser } from "ast/parser/parsers/VariableDefinition";
import { ParserTokenTypes } from "ast/types/ParserTokenTypes";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

import { expectTokenType } from "../../../helper/lexer/CompareTokenType";
import {
  mockEnd,
  mockIdentifier,
  mockKeyword,
  mockNumber,
  mockSubstitute,
} from "../../../helper/lexer/MockToken";
import { MorphemeTokenTypes } from "../../../../src/token/types/MorphemeTokenTypes";

describe("VariableDefinition", function () {
  describe("매치 되는 경우", function () {
    it("'변수1을 4로 선언한다.' 일 때", function () {
      const mockTokens = [
        mockIdentifier("변수1을"),
        mockSubstitute(mockNumber(4)),
        mockKeyword("variable_define"),
        mockEnd("dot"),
      ];
      const result = VariableDefinitionParser(mockTokens, 0);

      expectTokenType(result, ParserTokenTypes.VARIABLE_DEFINITION);
      expectTokenType(result.name, MorphemeTokenTypes.IDENTIFIER);
      expect(result.name.name).to.equal("변수1");
      expectTokenType(result.value, LexerTokenTypes.NUMBER);
      expect(result.value.number).to.equal(4);
    });

    it("'변수1을 선언한다.' 일 때", function () {
      const mockTokens = [
        mockIdentifier("변수1을"),
        mockKeyword("variable_define"),
        mockEnd("dot"),
      ];
      const result = VariableDefinitionParser(mockTokens, 0);

      expectTokenType(result, ParserTokenTypes.VARIABLE_DEFINITION);
      expectTokenType(result.name, MorphemeTokenTypes.IDENTIFIER);
      expect(result.name.name).to.equal("변수1");
    });
  });
  describe("매치 되지 않는 경우", function () {});
});
