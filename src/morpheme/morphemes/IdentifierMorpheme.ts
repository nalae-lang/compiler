import { MorphemeAnalyser, MorphemeTokenBase } from "morpheme/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

export interface IdentifierToken extends MorphemeTokenBase {
  readonly type: MorphemeTokenTypes.IDENTIFIER;
  readonly name: string;
}

export const IdentifierMorpheme: MorphemeAnalyser<IdentifierToken> = state => {
  const token = state.getLexerToken();
  if (token?.type === LexerTokenTypes.GRAMMAR) {
    state.addMorphemeToken({
      type: MorphemeTokenTypes.IDENTIFIER,
      tokenIndex: {
        start: state.getIndex(),
        end: state.getIndex() + 1,
      },
      name: token.text,
    });
    return true;
  }
  return false;
};
