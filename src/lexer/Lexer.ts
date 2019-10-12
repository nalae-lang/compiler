import { CommentLexer } from "./lexers/CommentLexer";
import { LexerState, Lexer } from "lexer";
import { StringLexer } from "./lexers/StringLexer";
import { RawCodeLexer } from "./lexers/RawCodeLexer";
import { GrammerLexer } from "./lexers/GrammerLexer";
import { KeywordLexer } from "./lexers/KeywordLexer";
import { IndentLexer } from "./lexers/IndentLexer";
import { NumberLexer } from "./lexers/NumberLexer";
import { OperatorLexer } from "./lexers/OperatorLexer";
import { EndLexer } from "./lexers/EndLexer";
import { Token } from "token";
import { NalaeLexerError } from "./error";
import { ErrorCode } from "./error/ErrorCode";

export class NalaeLexer {
  private readonly state: LexerState;
  private readonly lexers: Lexer<Token>[];

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

  private afterLex(tokens: Token[]): Token[] {
    return IndentLexer.reduceIndent(tokens);
  }

  public lex(): Token[] {
    this.beforeLex();
    const tokens: Token[] = [];
    const { code } = this.state;
    let i = 0;
    while (i < code.length) {
      let result = null as Token | null;
      this.lexers.find(lexer => (result = lexer.parse(i)));
      if (result) {
        tokens.push(result);
        i = result.index.end;
      } else {
        i++;
      }
    }
    return this.afterLex(tokens);
  }
}
