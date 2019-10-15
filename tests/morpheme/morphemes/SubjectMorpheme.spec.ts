import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { SubjectMorpheme } from "morpheme/morphemes/SubjectMorpheme";
import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { mockGrammer } from "../../helper/morpheme/MockGrammer";

describe("SubjectMorpheme", () => {
  const subjectMorpheme = new SubjectMorpheme();
  describe("매치 되는 경우", () => {
    it("받침이 없을 때 + 는", () => {
      const mockGrammerToken = mockGrammer("변수는");
      const result = subjectMorpheme.analyze(mockGrammerToken);
      if (compareTokenType(result, MorphemeTokenTypes.SUBJECT)) {
        expect(result.subjectType).to.equal("은/는");
        expect(result.subject.name).to.equal("변수");
      }
    });

    it("받침이 있을 때 + 은", () => {
      const mockGrammerToken = mockGrammer("받침은");
      const result = subjectMorpheme.analyze(mockGrammerToken);
      if (compareTokenType(result, MorphemeTokenTypes.SUBJECT)) {
        expect(result.subjectType).to.equal("은/는");
        expect(result.subject.name).to.equal("받침");
      }
    });

    it("받침이 없을 때 + 가", () => {
      const mockGrammerToken = mockGrammer("변수가");
      const result = subjectMorpheme.analyze(mockGrammerToken);
      if (compareTokenType(result, MorphemeTokenTypes.SUBJECT)) {
        expect(result.subjectType).to.equal("이/가");
        expect(result.subject.name).to.equal("변수");
      }
    });

    it("받침이 있을 때 + 이", () => {
      const mockGrammerToken = mockGrammer("받침이");
      const result = subjectMorpheme.analyze(mockGrammerToken);
      if (compareTokenType(result, MorphemeTokenTypes.SUBJECT)) {
        expect(result.subjectType).to.equal("이/가");
        expect(result.subject.name).to.equal("받침");
      }
    });
  });

  describe("매치 되지 않는 경우", () => {
    it("받침이 없을 때 + 은", () => {
      const mockGrammerToken = mockGrammer("변수은");
      const result = subjectMorpheme.analyze(mockGrammerToken);

      expect(result).to.be.not.true;
    });

    it("받침이 있을 때 + 는", () => {
      const mockGrammerToken = mockGrammer("받침는");
      const result = subjectMorpheme.analyze(mockGrammerToken);

      expect(result).to.be.not.true;
    });

    it("받침이 없을 때 + 이", () => {
      const mockGrammerToken = mockGrammer("변수이");
      const result = subjectMorpheme.analyze(mockGrammerToken);

      expect(result).to.be.not.true;
    });

    it("받침이 있을 때 + 가", () => {
      const mockGrammerToken = mockGrammer("받침가");
      const result = subjectMorpheme.analyze(mockGrammerToken);

      expect(result).to.be.not.true;
    });

    it("은/는/이/가로 끝나지 않을 때", () => {
      const mockGrammerToken = mockGrammer("받침");
      const result = subjectMorpheme.analyze(mockGrammerToken);

      expect(result).to.be.not.true;
    });

    it("글자가 하나일 때", () => {
      const mockGrammerToken = mockGrammer("이");
      const result = subjectMorpheme.analyze(mockGrammerToken);

      expect(result).to.be.not.true;
    });
  });
});
