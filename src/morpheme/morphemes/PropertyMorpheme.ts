import { MorphemeAnalyser, MorphemeTokenBase } from "morpheme/interface";
import { ValueToken } from "token/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { isValueToken } from "utils/IsValueToken";

export interface PropertyToken extends MorphemeTokenBase {
  readonly type: MorphemeTokenTypes.PROPERTY;
  readonly object: ValueToken;
}

const PROPERTY_TEXT = "의";

export const PropertyMorpheme: MorphemeAnalyser<PropertyToken> = state => {
  const token = state.getLexerToken();

  if (isValueToken(token)) {
    const nextToken = state.getLexerToken(1);
    if (
      nextToken?.type === LexerTokenTypes.GRAMMAR &&
      nextToken.text === PROPERTY_TEXT
    ) {
      state.addMorphemeToken({
        type: MorphemeTokenTypes.PROPERTY,
        tokenIndex: {
          start: state.getIndex(),
          end: state.getIndex() + 2,
        },
        object: token,
      });
      return true;
    }
  }
  if (token?.type === LexerTokenTypes.GRAMMAR) {
    if (token.text.length > 2 && token.text.endsWith(PROPERTY_TEXT)) {
      state.addMorphemeToken({
        type: MorphemeTokenTypes.PROPERTY,
        tokenIndex: {
          start: state.getIndex(),
          end: state.getIndex() + 1,
        },
        object: {
          type: MorphemeTokenTypes.IDENTIFIER,
          tokenIndex: {
            start: state.getIndex(),
            end: state.getIndex() + 1,
          },
          index: {
            start: token.index.start,
            end: token.index.end - PROPERTY_TEXT.length,
          },
          name: token.text.substr(0, token.text.length - PROPERTY_TEXT.length),
        },
      });
      return true;
    }
  }

  return false;
};
