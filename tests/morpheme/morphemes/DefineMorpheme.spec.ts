import { DefineMorpheme } from "morpheme/morphemes/DefineMorpheme";
import { mockGrammer } from "../../helper/lexer/MockToken";
import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import snapshot = require("snap-shot-it");

describe("DefineMorpheme", () => {
  const defineMorpheme = new DefineMorpheme();
  describe("매치 되는 경우", () => {
    it("'사람이다'일 때", () => {
      const mockGrammerToken = mockGrammer("사람이다");
      const result = defineMorpheme.analyze(mockGrammerToken);

      if (compareTokenType(result, MorphemeTokenTypes.DEFINE)) {
        if (compareTokenType(result.value, MorphemeTokenTypes.IDENTIFIER)) {
          snapshot(result);
          expect(result.value.name).to.equal("사람");
          expect(result.value.index.end).to.equal(2);
        }
      }
    });

    it("'바다이다'일 때", () => {
      const mockGrammerToken = mockGrammer("바다이다");
      const result = defineMorpheme.analyze(mockGrammerToken);

      if (compareTokenType(result, MorphemeTokenTypes.DEFINE)) {
        if (compareTokenType(result.value, MorphemeTokenTypes.IDENTIFIER)) {
          snapshot(result);
          expect(result.value.name).to.equal("바다");
          expect(result.value.index.end).to.equal(2);
        }
      }
    });

    it("'바다다'일 때", () => {
      const mockGrammerToken = mockGrammer("바다다");
      const result = defineMorpheme.analyze(mockGrammerToken);

      if (compareTokenType(result, MorphemeTokenTypes.DEFINE)) {
        if (compareTokenType(result.value, MorphemeTokenTypes.IDENTIFIER)) {
          snapshot(result);
          expect(result.value.name).to.equal("바다");
          expect(result.value.index.end).to.equal(2);
        }
      }
    });

    it("'이다'일 때", () => {
      const mockGrammerToken = mockGrammer("이다");
      const result = defineMorpheme.analyze(mockGrammerToken);

      if (compareTokenType(result, MorphemeTokenTypes.DEFINE)) {
        snapshot(result);
        expect(result.value).to.be.null;
      }
    });
  });

  describe("매치 되지 않는 경우", () => {
    it("'사람다'일 때", () => {
      const mockGrammerToken = mockGrammer("사람다");
      const result = defineMorpheme.analyze(mockGrammerToken);

      expect(result).to.be.null;
    });

    it("'다'일 때", () => {
      const mockGrammerToken = mockGrammer("다");
      const result = defineMorpheme.analyze(mockGrammerToken);

      expect(result).to.be.null;
    });
  });
});
