import { Index } from "token";

import { LexerErrorCode } from "./ErrorCode";
import { formatString } from "utils/FormatString";

export class NalaeLexerError {
  public name = "NalaeLexerError";
  public index: Index;
  public message: string;
  public constructor(
    code: LexerErrorCode,
    index: Index,
    parameter?: Array<string | number>
  ) {
    this.message = formatString(code, parameter);
    this.index = index;
  }
}
