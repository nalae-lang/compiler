import { LexerToken, MorphemeToken, Token } from "token/interface";

export default class MorphemeState<T extends MorphemeToken = MorphemeToken> {
  public morphemeTokens: Array<Token> = [];
  private index = 0;
  public constructor(public lexerTokens: ReadonlyArray<LexerToken>) {}

  public getLexerToken(index = 0): LexerToken | undefined {
    return this.lexerTokens[this.index + index];
  }

  public addMorphemeToken(token: Omit<T, "index">): void {
    this.morphemeTokens.push({
      ...token,
      index: {
        start: this.lexerTokens[token.tokenIndex.start].index.start,
        end: this.lexerTokens[token.tokenIndex.end - 1].index.end,
      },
    } as MorphemeToken);
    this.setIndex(token.tokenIndex.end);
  }

  public setIndex(index: number): void {
    this.index = index;
  }

  public getIndex(): number {
    return this.index;
  }

  public isLexable(): boolean {
    return this.index < this.lexerTokens.length;
  }
}
