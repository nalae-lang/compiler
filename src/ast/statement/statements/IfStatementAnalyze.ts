import { Statement, StatementBase } from "../interface";
import { StatementType } from "../StatementType";

export interface IfStatement extends StatementBase {
  readonly type: StatementType.IF_STATEMENT;
  readonly themStatement: Statement;
  readonly elseStatement: Statement | null;
}

// TODO: IfStatement 구조 생각
// export class IfStatementAnalyze extends StatementAnalyzer<IfStatement> {
//   public analyze(index: number): IfStatement | null {
//     const { tokens } = this.state;

//     const token = tokens[index];

//     if (token.type === )
//   }

// }
