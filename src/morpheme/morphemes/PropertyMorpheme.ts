import { GrammerToken } from "lexer/lexers/GrammerLexer";
import { MorphemeAnalyser } from "morpheme/interface";
import { TokenBase } from "token/interface";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

import { IdentifierToken } from "./IdentifierMorpheme";

export interface PropertyToken extends TokenBase {
  readonly type: MorphemeTokenTypes.PROPERTY;
  readonly object: IdentifierToken;
}

export class PropertyMorpheme implements MorphemeAnalyser<PropertyToken> {
  public analyze(token: GrammerToken): PropertyToken | null {
    if (token.text[token.text.length - 1] === "의") {
      return {
        type: MorphemeTokenTypes.PROPERTY,
        index: token.index,
        object: {
          type: MorphemeTokenTypes.IDENTIFIER,
          index: {
            start: token.index.start,
            end: token.index.end - 1
          },
          name: token.text.substr(0, token.text.length - 1)
        }
      };
    }
    return null;
  }
}
