import { TokenBase, ValueToken } from "token";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { MorphemeAnalyser } from "morpheme";
import { GrammerToken } from "lexer/lexers/GrammerLexer";
import { checkPostPosition } from "utils/CheckPostPosition";

export interface SubjectToken extends TokenBase {
  type: MorphemeTokenTypes.SUBJECT;
  subject: ValueToken | null;
  subjectType: "은/는" | "이/가";
}

export class SubjectMorpheme implements MorphemeAnalyser<SubjectToken> {
  public analyze(token: GrammerToken): SubjectToken | null {
    if (["은", "는"].indexOf(token.text) > -1) {
      return {
        type: MorphemeTokenTypes.SUBJECT,
        index: token.index,
        subject: null,
        subjectType: "은/는"
      };
    }

    if (["이", "가"].indexOf(token.text) > -1) {
      return {
        type: MorphemeTokenTypes.SUBJECT,
        index: token.index,
        subject: null,
        subjectType: "이/가"
      };
    }

    const subjectResult = {
      type: MorphemeTokenTypes.SUBJECT,
      index: token.index,
      subject: {
        type: MorphemeTokenTypes.IDENTIFIER,
        index: {
          start: token.index.start,
          end: token.index.end - 1
        },
        name: token.text.substr(0, token.text.length - 1)
      }
    } as const;
    if (checkPostPosition(token.text, ["은", "는"])) {
      return {
        ...subjectResult,
        subjectType: "은/는"
      };
    }
    if (checkPostPosition(token.text, ["이", "가"])) {
      return {
        ...subjectResult,
        subjectType: "이/가"
      };
    }
    return null;
  }
}
