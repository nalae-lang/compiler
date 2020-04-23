import type {
  CommentToken,
  EndToken,
  GrammarToken,
  IndentToken,
  KeywordToken,
  NumberToken,
  OperatorToken,
  RawCodeToken,
  StringToken,
} from "lexer/lexers";
import type {
  ArgumentToken,
  AssertToken,
  IdentifierToken,
  NamedToken,
  PropertyToken,
  SubjectToken,
  SubstituteToken,
} from "morpheme/morphemes";
import type { LexerTokenTypes } from "./types/LexerTokenTypes";
import type { ParserTokenTypes } from "ast/types/ParserTokenTypes";
import type { MorphemeTokenTypes } from "./types/MorphemeTokenTypes";

export type TokenTypes =
  | LexerTokenTypes
  | MorphemeTokenTypes
  | ParserTokenTypes;

export interface Index {
  start: number;
  end: number;
}

export interface TokenBase {
  readonly type: string;
  readonly index: Index;
}

export type LexerToken =
  | StringToken
  | EndToken
  | IndentToken
  | NumberToken
  | RawCodeToken
  | GrammarToken
  | CommentToken
  | OperatorToken
  | KeywordToken;

export type MorphemeToken =
  | IdentifierToken
  | PropertyToken
  | SubjectToken
  | AssertToken
  | NamedToken
  | ArgumentToken
  | SubstituteToken;

export type Token = LexerToken | MorphemeToken;

export type ValueToken =
  | StringToken
  | NumberToken
  | IdentifierToken
  | RawCodeToken;
