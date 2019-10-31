import { Index } from "token/interface";
import { formatString } from "utils/FormatString";

import { LexerErrorCode } from "./ErrorCode";

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
