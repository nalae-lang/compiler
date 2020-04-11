import { Token } from "token/interface";
import { Lexer } from "./interface";
import LexerState from "./LexerState";
import {
  CommentLexer,
  EndLexer,
  GrammarLexer,
  IndentLexer,
  KeywordLexer,
  NumberLexer,
  OperatorLexer,
  RawCodeLexer,
  StringLexer,
} from "./lexers";
import { NalaeLexerError } from "./error";
import { LexerErrorCode } from "./error/ErrorCode";

export class NalaeLexer {
  private readonly lexers: Array<Lexer>;

  public constructor() {
    this.lexers = [
      IndentLexer,
      EndLexer,
      RawCodeLexer,
      CommentLexer,
      KeywordLexer,
      OperatorLexer,
      GrammarLexer,
      StringLexer,
      NumberLexer,
    ];
  }

  private beforeLex(code: string): string {
    // \r\n을 \n으로 압축
    return code.replace("\r\n", "\n");
  }

  public lex(code: string): Array<Token> {
    const lexerState = new LexerState(this.beforeLex(code));
    while (lexerState.isLexable()) {
      if (!this.lexers.some(lexer => lexer(lexerState))) {
        throw new NalaeLexerError(
          LexerErrorCode.LEXER_UNKNOWN_WORD,
          {
            start: lexerState.getIndex(),
            end: lexerState.getIndex() + 1,
          },
          [lexerState.getCurrentCode(1)],
        );
      }
    }
    return lexerState.lexerTokens;
  }
}
