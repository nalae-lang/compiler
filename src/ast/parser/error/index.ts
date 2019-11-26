import { Index } from "token/interface";
import { NalaeErrorBase } from "utils/ErrorBase";

import { ASTParserErrorCode } from "./ErrorCode";

export class NalaeASTParserError extends NalaeErrorBase<ASTParserErrorCode> {
  public name = "NalaeASTParserError";

  public constructor(
    code: ASTParserErrorCode,
    index: Index,
    public tokenIndex: Index,
    parameter?: ReadonlyArray<string | number>
  ) {
    super(code, index, parameter);
  }
}
