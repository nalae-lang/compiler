import { TokenBase } from "token";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { IdentifierToken } from "./IdentifierMorpheme";
import { MorphemeAnalyser } from "morpheme";
import { GrammerToken } from "lexer/lexers/GrammerLexer";
import { checkPostPosition } from "utils/CheckPostPosition";

export interface SubjectToken extends TokenBase {
  type: MorphemeTokenTypes.SUBJECT;
  subject: IdentifierToken;
  subjectType: "은/는" | "이/가";
}

export class SubjectMorpheme implements MorphemeAnalyser<SubjectToken> {
  public analyze(token: GrammerToken): SubjectToken | null {
    if (token.text.length < 2) {
      return null;
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
