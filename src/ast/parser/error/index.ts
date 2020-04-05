import { Token } from "token/interface";
import { NalaeErrorBase } from "utils/ErrorBase";

import { ASTParserErrorCode } from "./ErrorCode";

interface TokenIndex {
  start: Token;
  end: Token;
}

export class NalaeASTParserError extends NalaeErrorBase<ASTParserErrorCode> {
  public name = "NalaeASTParserError";

  public constructor(
    code: ASTParserErrorCode,
    public tokenIndex: TokenIndex,
    parameter?: ReadonlyArray<string | number>,
  ) {
    super(
      code,
      {
        start: tokenIndex.start.index.start,
        end: tokenIndex.end.index.end,
      },
      parameter,
    );
  }
}
