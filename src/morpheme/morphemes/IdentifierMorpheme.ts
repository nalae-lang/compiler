import { TokenBase } from "token";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";
import { MorphemeAnalyser } from "morpheme";
import { GrammerToken } from "lexer/lexers/GrammerLexer";

export interface IdentifierToken extends TokenBase {
  readonly type: MorphemeTokenTypes.IDENTIFIER;
  readonly name: string;
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
