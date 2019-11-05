import { MorphemeTokenBase, Token } from "token/interface";

export interface MorphemeState {
  readonly tokens: ReadonlyArray<Token>;
}
export abstract class MorphemeAnalyser<T extends MorphemeTokenBase> {
  public constructor(protected state: MorphemeState) {}

  public abstract analyze(index: number): T | null;
}

export type MorphemeList = [string, string];
