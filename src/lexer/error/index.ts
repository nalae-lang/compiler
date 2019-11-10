import { NalaeErrorBase } from "utils/ErrorBase";

import { LexerErrorCode } from "./ErrorCode";

export class NalaeLexerError extends NalaeErrorBase<LexerErrorCode> {
  public name = "NalaeLexerError";
}
