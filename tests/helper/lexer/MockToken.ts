import { GrammerToken } from "lexer/lexers/GrammerLexer";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { EndType, EndToken } from "lexer/lexers/EndLexer";
import { IndentType, IndentToken } from "lexer/lexers/IndentLexer";

export function mockGrammer(text: string): GrammerToken {
  return {
    type: LexerTokenTypes.GRAMMER,
    index: {
      start: 0,
      end: text.length
    },
    text
  };
}

export function mockEnd(endType: EndType): EndToken {
  return {
    type: LexerTokenTypes.END,
    index: {
      start: 0,
      end: 1
    },
    endType
  };
}

export function mockIndent(indentType: IndentType): IndentToken {
  return {
    type: LexerTokenTypes.INDENT,
    index: {
      start: 0,
      end: 2
    },
    indentType
  };
}
