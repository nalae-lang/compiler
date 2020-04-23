import {
  MorphemeAnalyser,
  MorphemeList,
  MorphemeTokenBase,
} from "morpheme/interface";
import { ValueToken } from "token/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { checkPostPosition } from "utils/CheckPostPosition";
import { isValueToken } from "utils/IsValueToken";

export interface SubstituteToken extends MorphemeTokenBase {
  readonly type: MorphemeTokenTypes.SUBSTITUTE;
  readonly value: ValueToken;
}

export const SubstituteMorphemeList: MorphemeList = ["으로", "로"];

export const SubstituteMorpheme: MorphemeAnalyser<SubstituteToken> = state => {
  const token = state.getLexerToken();

  if (isValueToken(token)) {
    const nextToken = state.getLexerToken(1);
    if (nextToken?.type === LexerTokenTypes.GRAMMAR) {
      if (SubstituteMorphemeList.indexOf(nextToken.text) > -1) {
        state.addMorphemeToken({
          type: MorphemeTokenTypes.SUBSTITUTE,
          tokenIndex: {
            start: state.getIndex(),
            end: state.getIndex() + 1,
          },
          value: token,
        });
        return true;
      }
    }
  }
  if (token?.type === LexerTokenTypes.GRAMMAR) {
    const match = checkPostPosition(token.text, SubstituteMorphemeList);

    if (match !== false) {
      const morphemeLength = SubstituteMorphemeList[match].length;
      state.addMorphemeToken({
        type: MorphemeTokenTypes.SUBSTITUTE,
        tokenIndex: {
          start: state.getIndex(),
          end: state.getIndex() + 1,
        },
        value: {
          type: MorphemeTokenTypes.IDENTIFIER,
          tokenIndex: {
            start: state.getIndex(),
            end: state.getIndex() + 1,
          },
          index: {
            start: token.index.start,
            end: token.index.end - morphemeLength,
          },
          name: token.text.substr(0, token.text.length - morphemeLength),
        },
      });
      return true;
    }
  }
  return false;
};
