import { Index } from "token";

import { ErrorCode } from "./ErrorCode";

export class NalaeLexerError extends Error {
  name = "NalaeLexerError";
  index: Index;
  constructor(
    code: ErrorCode,
    index: Index,
    parameter?: Array<string | number>
  ) {
    super();
    let i = 0;
    this.message = parameter
      ? code.replace(/%s/g, () => "" + parameter[i++])
      : code;
    this.index = index;
  }
}
