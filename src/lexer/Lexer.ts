import { Token } from "token/interface";

import { NalaeLexerError } from "./error";
import { LexerErrorCode } from "./error/ErrorCode";
import { Lexer, LexerState } from "./interface";
import { CommentLexer } from "./lexers/CommentLexer";
import { EndLexer } from "./lexers/EndLexer";
import { GrammerLexer } from "./lexers/GrammerLexer";
import { IndentLexer } from "./lexers/IndentLexer";
import { KeywordLexer } from "./lexers/KeywordLexer";
import { NumberLexer } from "./lexers/NumberLexer";
import { OperatorLexer } from "./lexers/OperatorLexer";
import { RawCodeLexer } from "./lexers/RawCodeLexer";
import { StringLexer } from "./lexers/StringLexer";

export class NalaeLexer {
  private readonly state: LexerState;
  private readonly lexers: Array<Lexer<Token>>;

  public constructor(code: string) {
    this.state = {
      code
    };
    this.lexers = [
      new CommentLexer(this.state),
      new StringLexer(this.state),
      new RawCodeLexer(this.state),
      new KeywordLexer(this.state),
      new OperatorLexer(this.state),
      new IndentLexer(this.state),
      new EndLexer(this.state),
      new NumberLexer(this.state),
      new GrammerLexer(this.state)
    ];
  }

  public setCode(code: string): void {
    this.state.code = code;
  }

  private beforeLex(): void {
    const { code } = this.state;
    // \r\n을 \n으로 압축
    this.state.code = code.replace("\r\n", "\n");
  }

  private afterLex(tokens: Array<Token>): Array<Token> {
    return IndentLexer.reduceIndent(tokens);
  }

  public lex(): Array<Token> {
    this.beforeLex();
    const { code } = this.state;
    const tokens: Array<Token> = [];
    let i = 0;
    while (i < code.length) {
      let result = null as Token | null;
      this.lexers.find(lexer => (result = lexer.parse(i)));
      if (result !== null) {
        tokens.push(result);
        i = result.index.end;
      } else {
        if (code[i] === " ") {
          i++;
        } else {
          throw new NalaeLexerError(
            LexerErrorCode.LEXER_UNKNOWN_WORD,
            {
              start: i,
              end: i + 1
            },
            [code[i]]
          );
        }
      }
    }
    return this.afterLex(tokens);
  }
}
