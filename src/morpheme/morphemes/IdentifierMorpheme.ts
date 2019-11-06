import { MorphemeAnalyser, MorphemeTokenBase } from "morpheme/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

export interface IdentifierToken extends MorphemeTokenBase {
  readonly type: MorphemeTokenTypes.IDENTIFIER;
  readonly name: string;
}

export class IdentifierMorpheme extends MorphemeAnalyser<IdentifierToken> {
  public analyze(index: number): IdentifierToken | null {
    const { tokens } = this.state;
    const token = tokens[index];

    if (token.type === LexerTokenTypes.GRAMMER) {
      return {
        type: MorphemeTokenTypes.IDENTIFIER,
        index: token.index,
        tokenIndex: {
          start: index,
          end: index + 1
        },
        name: token.text
      };
    }
    return null;
  }
}
