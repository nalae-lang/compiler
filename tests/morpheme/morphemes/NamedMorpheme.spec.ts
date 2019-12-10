import { MorphemeErrorCode } from "morpheme/morphemes/error/ErrorCode";
import { NamedMorpheme } from "morpheme/morphemes/NamedMorpheme";
import snapshot = require("snap-shot-it");
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { formatString } from "utils/FormatString";

import { expectTokenType } from "../../helper/lexer/CompareTokenType";
import { createMorpheme } from "../../helper/lexer/CreateMorpheme";
import { mockGrammar } from "../../helper/lexer/MockToken";

describe("NamedMorpheme", function() {
  describe("매치 되는 경우", function() {
    it("'사람이라는'일 때", function() {
      const namedMorpheme = createMorpheme(NamedMorpheme, [
        mockGrammar("사람이라는"),
      ]);
      const result = namedMorpheme.analyze(0);

      expectTokenType(result, MorphemeTokenTypes.NAMED);
      expect(result.name).to.equal("이라는");
      expect(result.subject.name).to.equal("사람");
      snapshot(result);
    });

    it("'가나라는'일 때", function() {
      const namedMorpheme = createMorpheme(NamedMorpheme, [
        mockGrammar("가나라는"),
      ]);
      const result = namedMorpheme.analyze(0);

      expectTokenType(result, MorphemeTokenTypes.NAMED);
      expect(result.name).to.equal("라는");
      expect(result.subject.name).to.equal("가나");
      snapshot(result);
    });
  });

  describe("매치 되지 않는 경우", function() {
    it("'사람은'일 때", function() {
      const namedMorpheme = createMorpheme(NamedMorpheme, [
        mockGrammar("사람은"),
      ]);
      const result = namedMorpheme.analyze(0);

      expect(result).to.be.null;
    });

    it("'사람라는'일 때", function() {
      const namedMorpheme = createMorpheme(NamedMorpheme, [
        mockGrammar("사람라는"),
      ]);
      const result = namedMorpheme.analyze(0);

      expect(result).to.be.null;
    });

    it("'이라는'일 때", function() {
      const namedMorpheme = createMorpheme(NamedMorpheme, [
        mockGrammar("이라는"),
      ]);

      expect(function() {
        namedMorpheme.analyze(0);
      }).to.throw(formatString(MorphemeErrorCode.NAMED_SUBJECT_NOT_EXISTS));
    });
  });
});
