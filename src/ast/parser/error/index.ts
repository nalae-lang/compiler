import { NalaeErrorBase } from "utils/ErrorBase";

import { ASTParserErrorCode } from "./ErrorCode";

export class NalaeASTParserError extends NalaeErrorBase<ASTParserErrorCode> {
  public name = "NalaeASTParserError";
}
