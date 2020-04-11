import { GrammarToken } from "lexer/lexers/GrammarLexer";
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

export class ArgumentMorpheme extends MorphemeAnalyser<ArgumentToken> {
  public analyze(index: number): ArgumentToken | null {
    const { tokens } = this.state;
    const token = tokens[index];

    if (token.type === LexerTokenTypes.OPERATOR && token.operator === "~") {
      if (tokens[index + 1]?.type === LexerTokenTypes.GRAMMAR) {
        const grammarText = (tokens[index + 1] as GrammarToken).text;
        const ends = ChangeableEndList.find(
          end => end.indexOf(grammarText) > -1,
        );

        return {
          type: MorphemeTokenTypes.ARGUMENT,
          index: {
            start: token.index.start,
            end: tokens[index + 1].index.end,
          },
          tokenIndex: {
            start: index,
            end: index + 2,
          },
          names: ends !== undefined ? ends : [grammarText],
        };
      }

      return {
        type: MorphemeTokenTypes.ARGUMENT,
        index: token.index,
        tokenIndex: {
          start: index,
          end: index + 1,
        },
      };
    }
    return null;
  }
}
