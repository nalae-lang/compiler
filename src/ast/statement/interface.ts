import { Index, Token } from "token/interface";

import { IfStatement } from "./statements/IfStatementAnalyze";
import { StatementType } from "./StatementType";

export interface StatementBase {
  readonly type: StatementType;
  readonly tokenIndex: Index;
}

export interface StatementState {
  readonly tokens: ReadonlyArray<Token>;
}

export type Statement = IfStatement;

export abstract class StatementAnalyzer<T extends StatementBase> {
  public constructor(protected state: StatementState) {}

  public abstract analyze(index: number): T | null;
}
