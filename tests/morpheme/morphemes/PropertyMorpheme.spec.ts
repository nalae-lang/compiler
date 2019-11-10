import { PropertyMorpheme } from "morpheme/morphemes/PropertyMorpheme";
import snapshot = require("snap-shot-it");
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

import { expectTokenType } from "../../helper/lexer/CompareTokenType";
import { createMorpheme } from "../../helper/lexer/CreateMorpheme";
import {
  mockGrammar,
  mockNumber,
  mockRawCode,
  mockString
} from "../../helper/lexer/MockToken";

describe("PropertyMorpheme", function() {
  describe("매치 되는 경우", function() {
    it("'사람의'일 때", function() {
      const propertyMorpheme = createMorpheme(PropertyMorpheme, [
        mockGrammar("사람의")
      ]);
      const result = propertyMorpheme.analyze(0);

      expectTokenType(result, MorphemeTokenTypes.PROPERTY);
      expectTokenType(result.object, MorphemeTokenTypes.IDENTIFIER);
      expect(result.object.name).to.equal("사람");
      snapshot(result);
    });

    it("'3의'일 때", function() {
      const propertyMorpheme = createMorpheme(PropertyMorpheme, [
        mockNumber(3),
        mockGrammar("의")
      ]);
      const result = propertyMorpheme.analyze(1);

      expectTokenType(result, MorphemeTokenTypes.PROPERTY);
      expectTokenType(result.object, LexerTokenTypes.NUMBER);
      expect(result.object.number).to.equal(3);
      snapshot(result);
    });

    it("'\"문자열\"의'일 때", function() {
      const propertyMorpheme = createMorpheme(PropertyMorpheme, [
        mockString("문자열"),
        mockGrammar("의")
      ]);
      const result = propertyMorpheme.analyze(1);

      expectTokenType(result, MorphemeTokenTypes.PROPERTY);
      expectTokenType(result.object, LexerTokenTypes.STRING);

      expect(result.object.string).to.equal("문자열");
      snapshot(result);
    });

    it("'`new Date()`의'일 때", function() {
      const propertyMorpheme = createMorpheme(PropertyMorpheme, [
        mockRawCode("new Date()"),
        mockGrammar("의")
      ]);
      const result = propertyMorpheme.analyze(1);

      expectTokenType(result, MorphemeTokenTypes.PROPERTY);
      expectTokenType(result.object, LexerTokenTypes.RAWCODE);
      expect(result.object.code).to.equal("new Date()");
      snapshot(result);
    });
  });

  describe("매치 되지 않는 경우", function() {
    it("'사람'일 때", function() {
      const propertyMorpheme = createMorpheme(PropertyMorpheme, [
        mockGrammar("사람")
      ]);
      const result = propertyMorpheme.analyze(0);

      expect(result).to.be.null;
    });
  });
});
