import { Index } from "token";

import { ErrorCode } from "./ErrorCode";
import { formatString } from "utils/FormatString";

export class NalaeLexerError {
  name = "NalaeLexerError";
  index: Index;
  message: string;
  constructor(
    code: ErrorCode,
    index: Index,
    parameter?: Array<string | number>
  ) {
    this.message = formatString(code, parameter);
    this.index = index;
  }
}
