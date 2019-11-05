import { PropertyMorpheme } from "morpheme/morphemes/PropertyMorpheme";
import snapshot = require("snap-shot-it");
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { createMorpheme } from "../../helper/lexer/CreateMorpheme";
import { mockGrammer } from "../../helper/lexer/MockToken";

describe("PropertyMorpheme", () => {
  describe("매치 되는 경우", () => {
    it("뒤에 '의'가 붙었을 때", () => {
      const propertyMorpheme = createMorpheme(PropertyMorpheme, [
        mockGrammer("사람의")
      ]);
      const result = propertyMorpheme.analyze(0);

      if (compareTokenType(result, MorphemeTokenTypes.PROPERTY)) {
        snapshot(result);
        if (compareTokenType(result.object, MorphemeTokenTypes.IDENTIFIER)) {
          expect(result.object.name).to.equal("사람");
        }
      }
    });
  });

  describe("매치 되지 않는 경우", () => {
    it("뒤에 '의'가 없을 때", () => {
      const propertyMorpheme = createMorpheme(PropertyMorpheme, [
        mockGrammer("사람")
      ]);
      const result = propertyMorpheme.analyze(0);

      expect(result).to.be.null;
    });
  });
});
