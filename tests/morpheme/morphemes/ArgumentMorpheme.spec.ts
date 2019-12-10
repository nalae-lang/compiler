import { ArgumentMorpheme } from "morpheme/morphemes/ArgumentMorpheme";
import snapshot = require("snap-shot-it");
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

import { expectTokenType } from "../../helper/lexer/CompareTokenType";
import { createMorpheme } from "../../helper/lexer/CreateMorpheme";
import { mockGrammar, mockOperator } from "../../helper/lexer/MockToken";

describe("ArgumentMorpheme", function() {
  describe("매치 되는 경우", function() {
    it("'~과' 일 때", function() {
      const argumentMorpheme = createMorpheme(ArgumentMorpheme, [
        mockOperator("~"),
        mockGrammar("과"),
      ]);
      const result = argumentMorpheme.analyze(0);
      expectTokenType(result, MorphemeTokenTypes.ARGUMENT);
      expect(result.names).to.deep.equal(["과", "와"]);
      snapshot(result);
    });

    it("'~와' 일 때", function() {
      const argumentMorpheme = createMorpheme(ArgumentMorpheme, [
        mockOperator("~"),
        mockGrammar("와"),
      ]);
      const result = argumentMorpheme.analyze(0);
      expectTokenType(result, MorphemeTokenTypes.ARGUMENT);
      expect(result.names).to.deep.equal(["과", "와"]);
      snapshot(result);
    });

    it("'~로부터' 일 때", function() {
      const argumentMorpheme = createMorpheme(ArgumentMorpheme, [
        mockOperator("~"),
        mockGrammar("로부터"),
      ]);
      const result = argumentMorpheme.analyze(0);
      expectTokenType(result, MorphemeTokenTypes.ARGUMENT);
      expect(result.names).to.deep.equal(["으로부터", "로부터"]);
      snapshot(result);
    });

    it("'~가' 일 때", function() {
      const argumentMorpheme = createMorpheme(ArgumentMorpheme, [
        mockOperator("~"),
        mockGrammar("가"),
      ]);
      const result = argumentMorpheme.analyze(0);
      expectTokenType(result, MorphemeTokenTypes.ARGUMENT);
      expect(result.names).to.deep.equal(["가"]);
      snapshot(result);
    });

    it("'~' 일 때", function() {
      const argumentMorpheme = createMorpheme(ArgumentMorpheme, [
        mockOperator("~"),
      ]);
      const result = argumentMorpheme.analyze(0);
      expectTokenType(result, MorphemeTokenTypes.ARGUMENT);
      expect(result.names).to.be.not.exist;
      snapshot(result);
    });
  });

  describe("매치 되지 않는 경우", function() {
    it("'-' 일 때", function() {
      const argumentMorpheme = createMorpheme(ArgumentMorpheme, [
        mockOperator("-"),
      ]);
      const result = argumentMorpheme.analyze(0);
      expect(result).to.be.not.exist;
    });
  });
});
