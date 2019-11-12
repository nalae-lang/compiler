import { Index } from "token/interface";

import { formatString } from "./FormatString";

export abstract class NalaeErrorBase<T extends string> {
  public abstract name: string;
  public index: Index;
  public message: string;
  public constructor(
    code: T,
    index: Index,
    parameter?: Array<string | number>
  ) {
    this.message = formatString(code, parameter);
    this.index = index;
  }
}
