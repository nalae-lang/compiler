import { IdentifierMorpheme } from "morpheme/morphemes/IdentifierMorpheme";
import snapshot = require("snap-shot-it");
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { createMorpheme } from "../../helper/lexer/CreateMorpheme";
import { mockGrammer } from "../../helper/lexer/MockToken";

describe("IdentifierMorpheme", () => {
  describe("매치 되는 경우", () => {
    it("IdentifierMorpheme Token으로 변환", () => {
      const identifierMorpheme = createMorpheme(IdentifierMorpheme, [
        mockGrammer("변수1")
      ]);
      const result = identifierMorpheme.analyze(0);

      if (compareTokenType(result, MorphemeTokenTypes.IDENTIFIER)) {
        expect(result.name).to.equal("변수1");
        snapshot(result);
      }
    });
  });
});
