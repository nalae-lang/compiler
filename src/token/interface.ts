import { CommentToken } from "lexer/lexers/CommentLexer";
import { EndToken } from "lexer/lexers/EndLexer";
import { GrammerToken } from "lexer/lexers/GrammerLexer";
import { IndentToken } from "lexer/lexers/IndentLexer";
import { KeywordToken } from "lexer/lexers/KeywordLexer";
import { NumberToken } from "lexer/lexers/NumberLexer";
import { OperatorToken } from "lexer/lexers/OperatorLexer";
import { RawCodeToken } from "lexer/lexers/RawCodeLexer";
import { StringToken } from "lexer/lexers/StringLexer";
import { DefineToken } from "morpheme/morphemes/DefineMorpheme";
import { IdentifierToken } from "morpheme/morphemes/IdentifierMorpheme";
import { NamedToken } from "morpheme/morphemes/NamedMorpheme";
import { PropertyToken } from "morpheme/morphemes/PropertyMorpheme";
import { SubjectToken } from "morpheme/morphemes/SubjectMorpheme";
import { SubstituteToken } from "morpheme/morphemes/SubstituteMorpheme";

import { LexerTokenTypes } from "./types/LexerTokenTypes";
import { MorphemeTokenTypes } from "./types/MorphemeTokenTypes";

export type TokenTypes = LexerTokenTypes | MorphemeTokenTypes;

export interface Index {
  start: number;
  end: number;
}

export interface TokenBase {
  readonly type: TokenTypes;
  readonly index: Index;
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
  | SubjectToken
  | DefineToken
  | NamedToken
  | SubstituteToken;

export type ValueToken =
  | StringToken
  | NumberToken
  | IdentifierToken
  | RawCodeToken;
