import { SubstituteMorpheme } from "morpheme/morphemes/SubstituteMorpheme";
import snapshot = require("snap-shot-it");
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

describe("SubstituteMorpheme", function() {
  describe("매치 되는 경우", function() {
    it("'사람으로'일 때", function() {
      const substituteMorpheme = createMorpheme(SubstituteMorpheme, [
        mockGrammar("사람으로"),
      ]);
      const result = substituteMorpheme.analyze(0);

      expectTokenType(result, MorphemeTokenTypes.SUBSTITUTE);
      expectTokenType(result.value, MorphemeTokenTypes.IDENTIFIER);
      expect(result.value.name).to.equal("사람");
      expect(result.value.index.end).to.equal(2);
      expect(result.index.end).to.equal(4);
      snapshot(result);
    });

    it("'바다로'일 때", function() {
      const substituteMorpheme = createMorpheme(SubstituteMorpheme, [
        mockGrammar("바다로"),
      ]);
      const result = substituteMorpheme.analyze(0);

      expectTokenType(result, MorphemeTokenTypes.SUBSTITUTE);
      expectTokenType(result.value, MorphemeTokenTypes.IDENTIFIER);
      expect(result.value.name).to.equal("바다");
      expect(result.value.index.end).to.equal(2);
      expect(result.index.end).to.equal(3);
      snapshot(result);
    });

    it("'3으로'일 때", function() {
      const substituteMorpheme = createMorpheme(SubstituteMorpheme, [
        mockNumber(3),
        mockGrammar("으로"),
      ]);
      const result = substituteMorpheme.analyze(1);

      expectTokenType(result, MorphemeTokenTypes.SUBSTITUTE);
      expectTokenType(result.value, LexerTokenTypes.NUMBER);
      expect(result.value.number).to.equal(3);
      snapshot(result);
    });

    it("'\"문자열\"로'일 때", function() {
      const substituteMorpheme = createMorpheme(SubstituteMorpheme, [
        mockString("문자열"),
        mockGrammar("으로"),
      ]);
      const result = substituteMorpheme.analyze(1);

      expectTokenType(result, MorphemeTokenTypes.SUBSTITUTE);
      expectTokenType(result.value, LexerTokenTypes.STRING);
      expect(result.value.string).to.equal("문자열");
      snapshot(result);
    });

    it("'`new Date()`로'일 때", function() {
      const substituteMorpheme = createMorpheme(SubstituteMorpheme, [
        mockRawCode("new Date()"),
        mockGrammar("으로"),
      ]);
      const result = substituteMorpheme.analyze(1);

      expectTokenType(result, MorphemeTokenTypes.SUBSTITUTE);
      expectTokenType(result.value, LexerTokenTypes.RAWCODE);
      expect(result.value.code).to.equal("new Date()");
      snapshot(result);
    });
  });

  describe("매치 되지 않는 경우", function() {
    it("'서울로'일 때", function() {
      const substituteMorpheme = createMorpheme(SubstituteMorpheme, [
        mockGrammar("서울로"),
      ]);
      const result = substituteMorpheme.analyze(0);

      expect(result).to.be.null;
    });
    it("'바다으로'일 때", function() {
      const substituteMorpheme = createMorpheme(SubstituteMorpheme, [
        mockGrammar("바다으로"),
      ]);
      const result = substituteMorpheme.analyze(0);

      expect(result).to.be.null;
    });
  });
});
