import { Index } from "token/interface";
import { MorphemeErrorCode } from "./ErrorCode";
import { formatString } from "utils/FormatString";

export class NalaeMorphemeError {
  public name = "NalaeMorphemeError";
  public index: Index;
  public message: string;
  public constructor(
    code: MorphemeErrorCode,
    index: Index,
    parameter?: Array<string | number>
  ) {
    this.message = formatString(code, parameter);
    this.index = index;
  }
}
