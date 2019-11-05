import { SubstituteMorpheme } from "morpheme/morphemes/SubstituteMorpheme";
import snapshot = require("snap-shot-it");
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { createMorpheme } from "../../helper/lexer/CreateMorpheme";
import {
  mockGrammer,
  mockNumber,
  mockRawCode,
  mockString
} from "../../helper/lexer/MockToken";

describe("SubstituteMorpheme", () => {
  describe("매치 되는 경우", () => {
    it("'사람으로'일 때", () => {
      const substituteMorpheme = createMorpheme(SubstituteMorpheme, [
        mockGrammer("사람으로")
      ]);
      const result = substituteMorpheme.analyze(0);

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
      const substituteMorpheme = createMorpheme(SubstituteMorpheme, [
        mockGrammer("바다로")
      ]);
      const result = substituteMorpheme.analyze(0);

      if (compareTokenType(result, MorphemeTokenTypes.SUBSTITUTE)) {
        snapshot(result);
        if (compareTokenType(result.value, MorphemeTokenTypes.IDENTIFIER)) {
          expect(result.value.name).to.equal("바다");
          expect(result.value.index.end).to.equal(2);
        }
        expect(result.index.end).to.equal(3);
      }
    });

    it("'3으로'일 때", () => {
      const substituteMorpheme = createMorpheme(SubstituteMorpheme, [
        mockNumber(3),
        mockGrammer("으로")
      ]);
      const result = substituteMorpheme.analyze(1);

      if (compareTokenType(result, MorphemeTokenTypes.SUBSTITUTE)) {
        snapshot(result);
        if (compareTokenType(result.value, LexerTokenTypes.NUMBER)) {
          expect(result.value.number).to.equal(3);
        }
      }
    });

    it("'\"문자열\"로'일 때", () => {
      const substituteMorpheme = createMorpheme(SubstituteMorpheme, [
        mockString("문자열"),
        mockGrammer("으로")
      ]);
      const result = substituteMorpheme.analyze(1);

      if (compareTokenType(result, MorphemeTokenTypes.SUBSTITUTE)) {
        snapshot(result);
        if (compareTokenType(result.value, LexerTokenTypes.STRING)) {
          expect(result.value.string).to.equal("문자열");
        }
      }
    });

    it("'`new Date()`로'일 때", () => {
      const substituteMorpheme = createMorpheme(SubstituteMorpheme, [
        mockRawCode("new Date()"),
        mockGrammer("으로")
      ]);
      const result = substituteMorpheme.analyze(1);

      if (compareTokenType(result, MorphemeTokenTypes.SUBSTITUTE)) {
        snapshot(result);
        if (compareTokenType(result.value, LexerTokenTypes.RAWCODE)) {
          expect(result.value.code).to.equal("new Date()");
        }
      }
    });
  });

  describe("매치 되지 않는 경우", () => {
    it("'서울로'일 때", () => {
      const substituteMorpheme = createMorpheme(SubstituteMorpheme, [
        mockGrammer("서울로")
      ]);
      const result = substituteMorpheme.analyze(0);

      expect(result).to.be.null;
    });
    it("'바다으로'일 때", () => {
      const substituteMorpheme = createMorpheme(SubstituteMorpheme, [
        mockGrammer("바다으로")
      ]);
      const result = substituteMorpheme.analyze(0);

      expect(result).to.be.null;
    });
  });
});
