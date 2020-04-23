import { MorphemeAnalyser, MorphemeTokenBase } from "morpheme/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

const ChangeableEndList: ReadonlyArray<ReadonlyArray<string>> = [
  ["을", "를"],
  ["과", "와"],
  ["아", "야"],
  ["이여", "여"],
  ["이랑", "랑"],
  ["으로", "로"],
  ["으로서", "로서"],
  ["으로써", "로써"],
  ["으로부터", "로부터"],
];

export interface ArgumentToken extends MorphemeTokenBase {
  readonly type: MorphemeTokenTypes.ARGUMENT;
  readonly names?: ReadonlyArray<string>;
}

export const ArgumentMorpheme: MorphemeAnalyser<ArgumentToken> = state => {
  const token = state.getLexerToken();
  if (token?.type === LexerTokenTypes.OPERATOR && token.operator === "~") {
    const grammarToken = state.getLexerToken(1);
    if (grammarToken?.type === LexerTokenTypes.GRAMMAR) {
      const grammarText = grammarToken.text;
      const ends = ChangeableEndList.find(end => end.indexOf(grammarText) > -1);

      state.addMorphemeToken({
        type: MorphemeTokenTypes.ARGUMENT,
        tokenIndex: {
          start: state.getIndex(),
          end: state.getIndex() + 2,
        },
        names: ends !== undefined ? ends : [grammarText],
      });
      return true;
    }

    state.addMorphemeToken({
      type: MorphemeTokenTypes.ARGUMENT,
      tokenIndex: {
        start: state.getIndex(),
        end: state.getIndex() + 1,
      },
    });
    return true;
  }
  return false;
};
