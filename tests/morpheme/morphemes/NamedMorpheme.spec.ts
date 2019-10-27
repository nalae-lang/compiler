import { NamedMorpheme } from "morpheme/morphemes/NamedMorpheme";
import { mockGrammer } from "../../helper/morpheme/MockGrammer";
import { compareTokenType } from "../../helper/lexer/CompareTokenType";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { formatString } from "utils/FormatString";
import { MorphemeErrorCode } from "morpheme/morphemes/error/ErrorCode";

describe("NamedMorpheme", () => {
  const namedMorpheme = new NamedMorpheme();
  describe("매치 되는 경우", () => {
    it("뒤에 '이라는'이 붙었을 때", () => {
      const mockGrammerToken = mockGrammer("사람이라는");
      const result = namedMorpheme.analyze(mockGrammerToken);

      if (compareTokenType(result, MorphemeTokenTypes.NAMED)) {
        expect(result.name).to.equal("이라는");
        expect(result.subject.name).to.equal("사람");
      }
    });

    it("뒤에 '라는'이 붙었을 때", () => {
      const mockGrammerToken = mockGrammer("가나라는");
      const result = namedMorpheme.analyze(mockGrammerToken);

      if (compareTokenType(result, MorphemeTokenTypes.NAMED)) {
        expect(result.name).to.equal("라는");
        expect(result.subject.name).to.equal("가나");
      }
    });
  });

  describe("매치 되지 않는 경우", () => {
    it("뒤에 관형어가 없을 때", () => {
      const mockGrammerToken = mockGrammer("사람은");
      const result = namedMorpheme.analyze(mockGrammerToken);

      expect(result).to.be.null;
    });

    it("뒤에 맞지 않는 관형오가 올 때", () => {
      const mockGrammerToken = mockGrammer("사람라는");
      const result = namedMorpheme.analyze(mockGrammerToken);

      expect(result).to.be.null;
    });

    it("관형어만 있을 때", () => {
      const mockGrammerToken = mockGrammer("이라는");

      expect(() => {
        namedMorpheme.analyze(mockGrammerToken);
      }).to.throw(formatString(MorphemeErrorCode.NAMED_SUBJECT_NOT_EXISTS));
    });
  });
});
