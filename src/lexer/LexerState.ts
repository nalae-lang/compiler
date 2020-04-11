import { LexerToken } from "../token/interface";

export default class LexerState {
  public code: string;
  private index = 0;
  public lexerTokens: Array<LexerToken> = [];

  public constructor(code: string) {
    this.code = code;
  }

  public addLexerToken(token: LexerToken): void {
    this.lexerTokens.push(token);
    this.setIndex(token.index.end);
  }

  public getCurrentCode(length?: number): string {
    return this.code.substr(this.index, length);
  }

  public getCodeLength(): number {
    return this.code.length;
  }

  public setIndex(index: number): void {
    this.index = index;
  }

  public getIndex(): number {
    return this.index;
  }

  public isLexable(): boolean {
    return this.code.length > this.index;
  }
}
