import { EndToken, EndType } from "lexer/lexers/EndLexer";
import { GrammarToken } from "lexer/lexers/GrammarLexer";
import { IndentToken, IndentType } from "lexer/lexers/IndentLexer";
import { NumberToken, Radix } from "lexer/lexers/NumberLexer";
import { RawCodeToken } from "lexer/lexers/RawCodeLexer";
import { StringToken } from "lexer/lexers/StringLexer";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";

export function mockGrammar(text: string): GrammarToken {
  return {
    type: LexerTokenTypes.GRAMMAR,
    index: {
      start: 0,
      end: text.length
    },
    text
  };
}

export function mockNumber(number: number, radix: Radix = 10): NumberToken {
  return {
    type: LexerTokenTypes.NUMBER,
    index: {
      start: 0,
      end: `${number}`.length
    },
    number,
    radix
  };
}

export function mockString(string: string): StringToken {
  return {
    type: LexerTokenTypes.STRING,
    index: {
      start: 0,
      end: string.length
    },
    string
  };
}

export function mockRawCode(code: string): RawCodeToken {
  return {
    type: LexerTokenTypes.RAWCODE,
    index: {
      start: 0,
      end: code.length
    },
    code
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
