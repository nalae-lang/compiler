import { Index } from "token";

import { LexerErrorCode } from "./ErrorCode";
import { formatString } from "utils/FormatString";

export class NalaeLexerError {
  name = "NalaeLexerError";
  index: Index;
  message: string;
  constructor(
    code: LexerErrorCode,
    index: Index,
    parameter?: Array<string | number>
  ) {
    this.message = formatString(code, parameter);
    this.index = index;
  }
}
