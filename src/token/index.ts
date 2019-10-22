import { IndentToken } from "lexer/lexers/IndentLexer";
import { StringToken } from "lexer/lexers/StringLexer";
import { EndToken } from "lexer/lexers/EndLexer";
import { RawCodeToken } from "lexer/lexers/RawCodeLexer";
import { NumberToken } from "lexer/lexers/NumberLexer";
import { GrammerToken } from "lexer/lexers/GrammerLexer";
import { OperatorToken } from "lexer/lexers/OperatorLexer";
import { KeywordToken } from "lexer/lexers/KeywordLexer";
import { CommentToken } from "lexer/lexers/CommentLexer";
import { IdentifierToken } from "morpheme/morphemes/IdentifierMorpheme";
import { PropertyToken } from "morpheme/morphemes/PropertyMorpheme";
import { SubjectToken } from "morpheme/morphemes/SubjectMorpheme";
import { LexerTokenTypes } from "./types/LexerTokenTypes";
import { MorphemeTokenTypes } from "./types/MorphemeTokenTypes";

export type TokenTypes = LexerTokenTypes | MorphemeTokenTypes;

export interface Index {
  start: number;
  end: number;
}

export interface TokenBase {
  type: TokenTypes;
  index: Index;
}

export type Token =
  | IndentToken
  | StringToken
  | EndToken
  | RawCodeToken
  | NumberToken
  | GrammerToken
  | OperatorToken
  | KeywordToken
  | CommentToken
  | IdentifierToken
  | PropertyToken
  | SubjectToken;

export type ValueToken = StringToken | NumberToken | IdentifierToken;
