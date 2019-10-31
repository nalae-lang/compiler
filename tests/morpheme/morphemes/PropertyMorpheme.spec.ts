import { PropertyMorpheme } from "morpheme/morphemes/PropertyMorpheme";
import snapshot = require("snap-shot-it");
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { mockGrammer } from "../../helper/morpheme/MockGrammer";

describe("PropertyMorpheme", () => {
  const propertyMorpheme = new PropertyMorpheme();
  describe("매치 되는 경우", () => {
    it("뒤에 '의'가 붙었을 때", () => {
      const mockGrammerToken = mockGrammer("사람의");
      const result = propertyMorpheme.analyze(mockGrammerToken);

      if (compareTokenType(result, MorphemeTokenTypes.PROPERTY)) {
        snapshot(result);
        expect(result.object.type).to.equal(MorphemeTokenTypes.IDENTIFIER);
        expect(result.object.name).to.equal("사람");
      }
    });
  });

  describe("매치 되지 않는 경우", () => {
    it("뒤에 '의'가 없을 때", () => {
      const mockGrammerToken = mockGrammer("사람");
      const result = propertyMorpheme.analyze(mockGrammerToken);

      expect(result).to.be.null;
    });
  });
});
