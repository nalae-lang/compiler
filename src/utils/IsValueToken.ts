import { Token, ValueToken } from "token/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

export function isValueToken(token?: Token): token is ValueToken {
  if (token === undefined) {
    return false;
  }
  return (
    [
      LexerTokenTypes.STRING,
      LexerTokenTypes.RAWCODE,
      LexerTokenTypes.NUMBER,
      MorphemeTokenTypes.IDENTIFIER,
    ].indexOf(token?.type) > -1
  );
}
