import { Index } from "token";
import { MorphemeErrorCode } from "./ErrorCode";
import { formatString } from "utils/FormatString";

export class NalaeMorphemeError {
  name = "NalaeMorphemeError";
  index: Index;
  message: string;
  constructor(
    code: MorphemeErrorCode,
    index: Index,
    parameter?: Array<string | number>
  ) {
    this.message = formatString(code, parameter);
    this.index = index;
  }
}
