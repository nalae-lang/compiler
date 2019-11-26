import { EndToken, EndType } from "lexer/lexers/EndLexer";
import { GrammarToken } from "lexer/lexers/GrammarLexer";
import { IndentToken, IndentType } from "lexer/lexers/IndentLexer";
import { KeywordToken } from "lexer/lexers/KeywordLexer";
import { keywordList } from "lexer/lexers/models/KeywordList";
import { operatorList } from "lexer/lexers/models/OperatorList";
import { NumberToken, Radix } from "lexer/lexers/NumberLexer";
import { OperatorToken } from "lexer/lexers/OperatorLexer";
import { RawCodeToken } from "lexer/lexers/RawCodeLexer";
import { StringToken } from "lexer/lexers/StringLexer";
import {
  ArgumentMorpheme,
  ArgumentToken
} from "morpheme/morphemes/ArgumentMorpheme";
import { IdentifierToken } from "morpheme/morphemes/IdentifierMorpheme";
import {
  SubjectMorpheme,
  SubjectToken
} from "morpheme/morphemes/SubjectMorpheme";
import { Index } from "token/interface";
import { LexerTokenTypes } from "token/types/LexerTokenTypes";
import { MorphemeTokenTypes } from "token/types/MorphemeTokenTypes";

import { createMorpheme } from "./CreateMorpheme";

export function mockGrammar(
  text: string,
  index: Index = {
    start: 0,
    end: text.length
  }
): GrammarToken {
  return {
    type: LexerTokenTypes.GRAMMAR,
    index,
    text
  };
}

export function mockNumber(
  number: number,
  radix: Radix = 10,
  index: Index = {
    start: 0,
    end: `${number}`.length
  }
): NumberToken {
  return {
    type: LexerTokenTypes.NUMBER,
    index,
    number,
    radix
  };
}

export function mockString(
  string: string,
  index: Index = {
    start: 0,
    end: string.length
  }
): StringToken {
  return {
    type: LexerTokenTypes.STRING,
    index,
    string
  };
}

export function mockRawCode(
  code: string,
  index: Index = {
    start: 0,
    end: code.length
  }
): RawCodeToken {
  return {
    type: LexerTokenTypes.RAWCODE,
    index,
    code
  };
}

export function mockEnd(
  endType: EndType,
  index: Index = {
    start: 0,
    end: 1
  }
): EndToken {
  return {
    type: LexerTokenTypes.END,
    index,
    endType
  };
}

export function mockIndent(
  indentType: IndentType,
  index: Index = {
    start: 0,
    end: 2
  }
): IndentToken {
  return {
    type: LexerTokenTypes.INDENT,
    index,
    indentType
  };
}

export function mockOperator(
  operator: typeof operatorList[number],
  index: Index = {
    start: 0,
    end: operator.length
  }
): OperatorToken {
  return {
    type: LexerTokenTypes.OPERATOR,
    index,
    operator
  };
}

export function mockSubject(text: string): SubjectToken {
  return createMorpheme(SubjectMorpheme, [mockGrammar(text)]).analyze(
    0
  ) as SubjectToken;
}

export function mockArgument(postfix: string): ArgumentToken {
  return createMorpheme(ArgumentMorpheme, [
    mockOperator("~"),
    postfix !== undefined ? mockGrammar(postfix) : mockEnd("dot")
  ]).analyze(0) as ArgumentToken;
}

export function mockIdentifier(
  name: string,
  index: Index = {
    start: 0,
    end: name.length
  }
): IdentifierToken {
  return {
    type: MorphemeTokenTypes.IDENTIFIER,
    index,
    name,
    tokenIndex: { start: 0, end: 1 }
  };
}

export function mockKeyword(
  keyword: typeof keywordList[number]["name"],
  index: Index = {
    start: 0,
    end: keyword.length
  }
): KeywordToken {
  return {
    type: LexerTokenTypes.KEYWORD,
    index,
    name: keyword
  };
}
