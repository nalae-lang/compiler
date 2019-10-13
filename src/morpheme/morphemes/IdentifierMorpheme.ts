import { TokenBase, MorphemeTokenTypes } from "token";
import { MorphemeAnalyser } from "morpheme";
import { GrammerToken } from "lexer/lexers/GrammerLexer";

export interface IdentifierToken extends TokenBase {
  type: MorphemeTokenTypes.IDENTIFIER;
  name: string;
}

export class IdentifierMorpheme implements MorphemeAnalyser<IdentifierToken> {
  public analyze(token: GrammerToken): IdentifierToken | null {
    return {
      type: MorphemeTokenTypes.IDENTIFIER,
      index: token.index,
      name: token.text
    };
  }
}
