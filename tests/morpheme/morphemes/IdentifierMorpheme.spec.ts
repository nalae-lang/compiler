import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { IdentifierMorpheme } from "morpheme/morphemes/IdentifierMorpheme";
import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { mockGrammer } from "../../helper/lexer/MockToken";
import snapshot = require("snap-shot-it");

describe("IdentifierMorpheme", () => {
  const identifierMorpheme = new IdentifierMorpheme();
  describe("매치 되는 경우", () => {
    it("IdentifierMorpheme Token으로 변환", () => {
      const mockGrammerToken = mockGrammer("변수1");
      const result = identifierMorpheme.analyze(mockGrammerToken);

      if (compareTokenType(result, MorphemeTokenTypes.IDENTIFIER)) {
        snapshot(result);
        expect(result.name).to.equal(mockGrammerToken.text);
      }
    });
  });
});
