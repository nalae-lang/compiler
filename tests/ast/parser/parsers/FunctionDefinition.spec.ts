import { FunctionDefinitionParser } from "ast/parser/parsers/FunctionDefinition";
import { ParserTokenTypes } from "ast/types/ParserTokenTypes";
import snapshot = require("snap-shot-it");
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

import { expectTokenType } from "../../../helper/lexer/CompareTokenType";
import {
  mockArgument,
  mockIdentifier,
  mockKeyword,
  mockOperator,
  mockSubject
} from "../../../helper/lexer/MockToken";

describe("FunctionDifinition", function() {
  describe("매치될 때", function() {
    it("'사람이 ~로 이동한다를 정의하면,' 일 때", function() {
      const mockTokens = [
        mockSubject("사람이"),
        mockArgument("로"),
        mockIdentifier("이동한다를"),
        mockKeyword("function_define"),
        mockOperator(",")
      ];
      const result = FunctionDefinitionParser(mockTokens, 3);

      expectTokenType(result, ParserTokenTypes.FUNCTION_DEFINITION);
      expect(result.name.name).to.equal("이동한다");
      expectTokenType(result.subject.subject, MorphemeTokenTypes.IDENTIFIER);
      expect(result.subject.subject.name).to.equal("사람");
      expectTokenType(result.arguments[0], MorphemeTokenTypes.ARGUMENT);
      expect(result.arguments[0].names).to.deep.equal(["으로", "로"]);

      snapshot(result);
    });
  });
});
