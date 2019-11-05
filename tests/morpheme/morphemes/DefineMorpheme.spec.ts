import { DefineMorpheme } from "morpheme/morphemes/DefineMorpheme";
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

describe("DefineMorpheme", () => {
  describe("매치 되는 경우", () => {
    it("'사람이다'일 때", () => {
      const defineMorpheme = createMorpheme(DefineMorpheme, [
        mockGrammer("사람이다")
      ]);
      const result = defineMorpheme.analyze(0);

      if (compareTokenType(result, MorphemeTokenTypes.DEFINE)) {
        if (compareTokenType(result.value, MorphemeTokenTypes.IDENTIFIER)) {
          snapshot(result);
          expect(result.value.name).to.equal("사람");
          expect(result.value.index.end).to.equal(2);
        }
      }
    });

    it("'바다이다'일 때", () => {
      const defineMorpheme = createMorpheme(DefineMorpheme, [
        mockGrammer("바다이다")
      ]);
      const result = defineMorpheme.analyze(0);

      if (compareTokenType(result, MorphemeTokenTypes.DEFINE)) {
        if (compareTokenType(result.value, MorphemeTokenTypes.IDENTIFIER)) {
          snapshot(result);
          expect(result.value.name).to.equal("바다");
          expect(result.value.index.end).to.equal(2);
        }
      }
    });

    it("'바다다'일 때", () => {
      const defineMorpheme = createMorpheme(DefineMorpheme, [
        mockGrammer("바다다")
      ]);
      const result = defineMorpheme.analyze(0);

      if (compareTokenType(result, MorphemeTokenTypes.DEFINE)) {
        if (compareTokenType(result.value, MorphemeTokenTypes.IDENTIFIER)) {
          snapshot(result);
          expect(result.value.name).to.equal("바다");
          expect(result.value.index.end).to.equal(2);
        }
      }
    });

    it("숫자 + '이다'일 때", () => {
      const defineMorpheme = createMorpheme(DefineMorpheme, [
        mockNumber(3),
        mockGrammer("이다")
      ]);
      const result = defineMorpheme.analyze(1);

      if (compareTokenType(result, MorphemeTokenTypes.DEFINE)) {
        snapshot(result);
        if (compareTokenType(result.value, LexerTokenTypes.NUMBER)) {
          expect(result.value.number).to.equal(3);
        }
      }
    });

    it("문자열 + '이다'일 때", () => {
      const defineMorpheme = createMorpheme(DefineMorpheme, [
        mockString("가나다라"),
        mockGrammer("이다")
      ]);
      const result = defineMorpheme.analyze(1);

      if (compareTokenType(result, MorphemeTokenTypes.DEFINE)) {
        snapshot(result);
        if (compareTokenType(result.value, LexerTokenTypes.STRING)) {
          expect(result.value.string).to.equal("가나다라");
        }
      }
    });

    it("js코드 + '이다'일 때", () => {
      const defineMorpheme = createMorpheme(DefineMorpheme, [
        mockRawCode("new Date()"),
        mockGrammer("이다")
      ]);
      const result = defineMorpheme.analyze(1);

      if (compareTokenType(result, MorphemeTokenTypes.DEFINE)) {
        snapshot(result);
        if (compareTokenType(result.value, LexerTokenTypes.RAWCODE)) {
          expect(result.value.code).to.equal("new Date()");
        }
      }
    });
  });

  describe("매치 되지 않는 경우", () => {
    it("'사람다'일 때", () => {
      const defineMorpheme = createMorpheme(DefineMorpheme, [
        mockGrammer("사람다")
      ]);
      const result = defineMorpheme.analyze(0);

      expect(result).to.be.null;
    });

    it("'다'일 때", () => {
      const defineMorpheme = createMorpheme(DefineMorpheme, [
        mockGrammer("다")
      ]);
      const result = defineMorpheme.analyze(0);

      expect(result).to.be.null;
    });
  });
});
