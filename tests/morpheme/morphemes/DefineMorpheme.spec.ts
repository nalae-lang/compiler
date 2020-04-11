import { DefineMorpheme } from "morpheme/morphemes/DefineMorpheme";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

import { expectTokenType } from "../../helper/lexer/CompareTokenType";
import { createMorpheme } from "../../helper/lexer/CreateMorpheme";
import {
  mockGrammar,
  mockNumber,
  mockRawCode,
  mockString,
} from "../../helper/lexer/MockToken";
import snapshot = require("snap-shot-it");

describe("DefineMorpheme", function () {
  describe("매치 되는 경우", function () {
    it("'사람이다'일 때", function () {
      const defineMorpheme = createMorpheme(DefineMorpheme, [
        mockGrammar("사람이다"),
      ]);
      const result = defineMorpheme.analyze(0);
      expectTokenType(result, MorphemeTokenTypes.DEFINE);
      expectTokenType(result.value, MorphemeTokenTypes.IDENTIFIER);
      expect(result.value.name).to.equal("사람");
      expect(result.value.index.end).to.equal(2);
      snapshot(result);
    });

    it("'바다이다'일 때", function () {
      const defineMorpheme = createMorpheme(DefineMorpheme, [
        mockGrammar("바다이다"),
      ]);
      const result = defineMorpheme.analyze(0);
      expectTokenType(result, MorphemeTokenTypes.DEFINE);
      expectTokenType(result.value, MorphemeTokenTypes.IDENTIFIER);
      expect(result.value.name).to.equal("바다");
      expect(result.value.index.end).to.equal(2);
      snapshot(result);
    });

    it("'바다다'일 때", function () {
      const defineMorpheme = createMorpheme(DefineMorpheme, [
        mockGrammar("바다다"),
      ]);
      const result = defineMorpheme.analyze(0);

      expectTokenType(result, MorphemeTokenTypes.DEFINE);
      expectTokenType(result.value, MorphemeTokenTypes.IDENTIFIER);
      expect(result.value.name).to.equal("바다");
      expect(result.value.index.end).to.equal(2);
      snapshot(result);
    });

    it("'3이다'일 때", function () {
      const defineMorpheme = createMorpheme(DefineMorpheme, [
        mockNumber(3),
        mockGrammar("이다"),
      ]);
      const result = defineMorpheme.analyze(1);

      expectTokenType(result, MorphemeTokenTypes.DEFINE);
      expectTokenType(result.value, LexerTokenTypes.NUMBER);
      expect(result.value.number).to.equal(3);
      snapshot(result);
    });

    it("'\"가나다라\"이다'일 때", function () {
      const defineMorpheme = createMorpheme(DefineMorpheme, [
        mockString("가나다라"),
        mockGrammar("이다"),
      ]);
      const result = defineMorpheme.analyze(1);

      expectTokenType(result, MorphemeTokenTypes.DEFINE);
      expectTokenType(result.value, LexerTokenTypes.STRING);

      expect(result.value.string).to.equal("가나다라");
      snapshot(result);
    });

    it("'`new Date()`이다'일 때", function () {
      const defineMorpheme = createMorpheme(DefineMorpheme, [
        mockRawCode("new Date()"),
        mockGrammar("이다"),
      ]);
      const result = defineMorpheme.analyze(1);

      expectTokenType(result, MorphemeTokenTypes.DEFINE);
      expectTokenType(result.value, LexerTokenTypes.RAWCODE);

      expect(result.value.code).to.equal("new Date()");
      snapshot(result);
    });
  });

  describe("매치 되지 않는 경우", function () {
    it("'사람다'일 때", function () {
      const defineMorpheme = createMorpheme(DefineMorpheme, [
        mockGrammar("사람다"),
      ]);
      const result = defineMorpheme.analyze(0);

      expect(result).to.be.null;
    });

    it("'다'일 때", function () {
      const defineMorpheme = createMorpheme(DefineMorpheme, [
        mockGrammar("다"),
      ]);
      const result = defineMorpheme.analyze(0);

      expect(result).to.be.null;
    });
  });
});
