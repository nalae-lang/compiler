import { SubjectMorpheme } from "morpheme/morphemes/SubjectMorpheme";
import snapshot = require("snap-shot-it");
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

import { expectTokenType } from "../../helper/lexer/CompareTokenType";
import { createMorpheme } from "../../helper/lexer/CreateMorpheme";
import { mockGrammer } from "../../helper/lexer/MockToken";

describe("SubjectMorpheme", function() {
  describe("매치 되는 경우", function() {
    it("'변수는'일 때", function() {
      const subjectMorpheme = createMorpheme(SubjectMorpheme, [
        mockGrammer("변수는")
      ]);
      const result = subjectMorpheme.analyze(0);

      expectTokenType(result, MorphemeTokenTypes.SUBJECT);
      expectTokenType(result.subject, MorphemeTokenTypes.IDENTIFIER);
      expect(result.subject.name).to.equal("변수");
      snapshot(result);
    });

    it("받침이 있을 때 + 은", function() {
      const subjectMorpheme = createMorpheme(SubjectMorpheme, [
        mockGrammer("받침은")
      ]);
      const result = subjectMorpheme.analyze(0);

      expectTokenType(result, MorphemeTokenTypes.SUBJECT);
      expectTokenType(result.subject, MorphemeTokenTypes.IDENTIFIER);
      expect(result.subject.name).to.equal("받침");
      snapshot(result);
    });

    it("받침이 없을 때 + 가", function() {
      const subjectMorpheme = createMorpheme(SubjectMorpheme, [
        mockGrammer("변수가")
      ]);
      const result = subjectMorpheme.analyze(0);

      expectTokenType(result, MorphemeTokenTypes.SUBJECT);
      expectTokenType(result.subject, MorphemeTokenTypes.IDENTIFIER);
      expect(result.subject.name).to.equal("변수");
      snapshot(result);
    });

    it("받침이 있을 때 + 이", function() {
      const subjectMorpheme = createMorpheme(SubjectMorpheme, [
        mockGrammer("받침이")
      ]);
      const result = subjectMorpheme.analyze(0);

      expectTokenType(result, MorphemeTokenTypes.SUBJECT);
      expectTokenType(result.subject, MorphemeTokenTypes.IDENTIFIER);
      expect(result.subject.name).to.equal("받침");
      snapshot(result);
    });

    it("'이'일 때", function() {
      const subjectMorpheme = createMorpheme(SubjectMorpheme, [
        mockGrammer("이")
      ]);
      const result = subjectMorpheme.analyze(0);

      expectTokenType(result, MorphemeTokenTypes.SUBJECT);
      expect(result.subject).to.be.not.exist;
    });
  });

  describe("매치 되지 않는 경우", function() {
    it("받침이 없을 때 + 은", function() {
      const subjectMorpheme = createMorpheme(SubjectMorpheme, [
        mockGrammer("변수은")
      ]);
      const result = subjectMorpheme.analyze(0);

      expect(result).to.be.null;
    });

    it("받침이 있을 때 + 는", function() {
      const subjectMorpheme = createMorpheme(SubjectMorpheme, [
        mockGrammer("받침는")
      ]);
      const result = subjectMorpheme.analyze(0);

      expect(result).to.be.null;
    });

    it("받침이 없을 때 + 이", function() {
      const subjectMorpheme = createMorpheme(SubjectMorpheme, [
        mockGrammer("변수이")
      ]);
      const result = subjectMorpheme.analyze(0);

      expect(result).to.be.null;
    });

    it("받침이 있을 때 + 가", function() {
      const subjectMorpheme = createMorpheme(SubjectMorpheme, [
        mockGrammer("받침가")
      ]);
      const result = subjectMorpheme.analyze(0);

      expect(result).to.be.null;
    });

    it("은/는/이/가로 끝나지 않을 때", function() {
      const subjectMorpheme = createMorpheme(SubjectMorpheme, [
        mockGrammer("받침")
      ]);
      const result = subjectMorpheme.analyze(0);

      expect(result).to.be.null;
    });
  });
});
