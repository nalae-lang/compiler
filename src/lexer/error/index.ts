import { Index } from "token";

import { ErrorCode } from "./ErrorCode";
import { formatString } from "utils/FormatString";

export class NalaeLexerError extends Error {
  name = "NalaeLexerError";
  index: Index;
  constructor(
    code: ErrorCode,
    index: Index,
    parameter?: Array<string | number>
  ) {
    super();
    this.message = formatString(code, parameter);
    this.index = index;
  }
}
