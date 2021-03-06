import { IdentifierMorpheme } from "morpheme/morphemes/IdentifierMorpheme";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

import { expectTokenType } from "../../helper/lexer/CompareTokenType";
import { createMorpheme } from "../../helper/lexer/CreateMorpheme";
import { mockGrammar, mockNumber } from "../../helper/lexer/MockToken";
import snapshot = require("snap-shot-it");

describe("IdentifierMorpheme", function () {
  describe("매치 되는 경우", function () {
    it("'변수1'일 때", function () {
      const identifierMorpheme = createMorpheme(IdentifierMorpheme, [
        mockGrammar("변수1"),
      ]);
      const result = identifierMorpheme.analyze(0);

      expectTokenType(result, MorphemeTokenTypes.IDENTIFIER);
      expect(result.name).to.equal("변수1");
      snapshot(result);
    });
  });
  describe("매치 되지 않는 경우", function () {
    it("'3'일 때", function () {
      const identifierMorpheme = createMorpheme(IdentifierMorpheme, [
        mockNumber(3),
      ]);
      const result = identifierMorpheme.analyze(0);

      expect(result).to.be.not.exist;
    });
  });
});
