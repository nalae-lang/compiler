import { SubstituteMorpheme } from "morpheme/morphemes/SubstituteMorpheme";
import snapshot = require("snap-shot-it");
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { mockGrammer } from "../../helper/lexer/MockToken";

describe("SubstituteMorpheme", () => {
  const substituteMorpheme = new SubstituteMorpheme();
  describe("매치 되는 경우", () => {
    it("'으로'일 때", () => {
      const mockGrammerToken = mockGrammer("으로");
      const result = substituteMorpheme.analyze(mockGrammerToken);

      if (compareTokenType(result, MorphemeTokenTypes.SUBSTITUTE)) {
        snapshot(result);
        expect(result.value).to.be.null;
        expect(result.index.end).to.equal(2);
      }
    });
    it("'사람으로'일 때", () => {
      const mockGrammerToken = mockGrammer("사람으로");
      const result = substituteMorpheme.analyze(mockGrammerToken);

      if (compareTokenType(result, MorphemeTokenTypes.SUBSTITUTE)) {
        if (compareTokenType(result.value, MorphemeTokenTypes.IDENTIFIER)) {
          snapshot(result);
          expect(result.value.name).to.equal("사람");
          expect(result.value.index.end).to.equal(2);
        }
        expect(result.index.end).to.equal(4);
      }
    });
    it("'바다로'일 때", () => {
      const mockGrammerToken = mockGrammer("바다로");
      const result = substituteMorpheme.analyze(mockGrammerToken);

      if (compareTokenType(result, MorphemeTokenTypes.SUBSTITUTE)) {
        if (compareTokenType(result.value, MorphemeTokenTypes.IDENTIFIER)) {
          snapshot(result);
          expect(result.value.name).to.equal("바다");
          expect(result.value.index.end).to.equal(2);
        }
        expect(result.index.end).to.equal(3);
      }
    });
  });

  describe("매치 되지 않는 경우", () => {
    it("'서울로'일 때", () => {
      const mockGrammerToken = mockGrammer("서울로");
      const result = substituteMorpheme.analyze(mockGrammerToken);

      expect(result).to.be.null;
    });
    it("'바다으로'일 때", () => {
      const mockGrammerToken = mockGrammer("바다으로");
      const result = substituteMorpheme.analyze(mockGrammerToken);

      expect(result).to.be.null;
    });
  });
});
