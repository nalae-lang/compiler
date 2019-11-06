import { Index, Token, TokenBase } from "token/interface";

export interface MorphemeTokenBase extends TokenBase {
  readonly tokenIndex: Index;
}
export interface MorphemeState {
  readonly tokens: ReadonlyArray<Token>;
}
export abstract class MorphemeAnalyser<T extends MorphemeTokenBase> {
  public constructor(protected state: MorphemeState) {}

  public abstract analyze(index: number): T | null;
}

export type MorphemeList = [string, string];
