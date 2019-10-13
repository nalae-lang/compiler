import { TokenBase, MorphemeTokenTypes } from "token";
import { IdentifierToken } from "./IdentifierMorpheme";
import { MorphemeAnalyser } from "morpheme";
import { GrammerToken } from "lexer/lexers/GrammerLexer";

export interface PropertyToken extends TokenBase {
  type: MorphemeTokenTypes.PROPERTY;
  object: IdentifierToken;
}

export class PropertyMorpheme extends MorphemeAnalyser<PropertyToken> {
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