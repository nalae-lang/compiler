import { GrammerToken } from "lexer/lexers/GrammerLexer";
import { MorphemeAnalyser } from "morpheme/interface";
import { TokenBase } from "token/interface";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

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
