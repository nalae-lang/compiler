import { MorphemeAnalyser, MorphemeTokenBase } from "morpheme/interface";
import { ValueToken } from "token/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { checkPostPosition } from "utils/CheckPostPosition";

export const SubjectEnd = ["은", "는", "이", "가"];

export type SubjectEndType = typeof SubjectEnd[number];

export interface SubjectToken extends MorphemeTokenBase {
  readonly type: MorphemeTokenTypes.SUBJECT;
  readonly subject: ValueToken | null;
  readonly endType: SubjectEndType;
}

export const SubjectMorpheme: MorphemeAnalyser<SubjectToken> = state => {
  const token = state.getLexerToken();

  if (token?.type === LexerTokenTypes.GRAMMAR) {
    if (SubjectEnd.indexOf(token.text) > -1) {
      state.addMorphemeToken({
        type: MorphemeTokenTypes.SUBJECT,
        tokenIndex: {
          start: state.getIndex(),
          end: state.getIndex() + 1,
        },
        subject: null,
        endType: token.text,
      });
      return true;
    }
    if (
      checkPostPosition(token.text, ["은", "는"]) !== false ||
      checkPostPosition(token.text, ["이", "가"]) !== false
    ) {
      state.addMorphemeToken({
        type: MorphemeTokenTypes.SUBJECT,
        tokenIndex: {
          start: state.getIndex(),
          end: state.getIndex() + 1,
        },
        subject: {
          type: MorphemeTokenTypes.IDENTIFIER,
          tokenIndex: {
            start: state.getIndex(),
            end: state.getIndex() + 1,
          },
          index: {
            start: token.index.start,
            end: token.index.end - 1,
          },
          name: token.text.substr(0, token.text.length - 1),
        },
        endType: token.text[token.text.length - 1],
      });
      return true;
    }
  }
  return false;
};
