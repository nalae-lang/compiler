import { MorphemeAnalyser, MorphemeTokenBase } from "morpheme/interface";
import { ValueToken } from "token/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { checkPostPosition } from "utils/CheckPostPosition";

export const SubjectEnd = ["은", "는", "이", "가"] as const;

export type SubjectEndType = typeof SubjectEnd[number];

export interface SubjectToken extends MorphemeTokenBase {
  readonly type: MorphemeTokenTypes.SUBJECT;
  readonly subject: ValueToken | null;
  readonly endType: SubjectEndType;
}

export class SubjectMorpheme extends MorphemeAnalyser<SubjectToken> {
  public analyze(index: number): SubjectToken | null {
    const { tokens } = this.state;
    const token = tokens[index];

    if (token.type === LexerTokenTypes.GRAMMER) {
      if (SubjectEnd.indexOf(token.text as SubjectEndType) > -1) {
        return {
          type: MorphemeTokenTypes.SUBJECT,
          index: token.index,
          tokenIndex: {
            start: index,
            end: index + 1
          },
          subject: null,
          endType: token.text as SubjectEndType
        };
      }
      if (
        checkPostPosition(token.text, ["은", "는"]) !== false ||
        checkPostPosition(token.text, ["이", "가"]) !== false
      ) {
        return {
          type: MorphemeTokenTypes.SUBJECT,
          index: token.index,
          tokenIndex: {
            start: index,
            end: index + 1
          },
          subject: {
            type: MorphemeTokenTypes.IDENTIFIER,
            index: {
              start: token.index.start,
              end: token.index.end - 1
            },
            tokenIndex: {
              start: index,
              end: index + 1
            },
            name: token.text.substr(0, token.text.length - 1)
          },
          endType: token.text[token.text.length - 1] as SubjectEndType
        };
      }
    }
    return null;
  }
}
