import { Index } from "token/interface";

import { formatString } from "./FormatString";

export abstract class NalaeErrorBase<T extends string> {
  public abstract name: string;
  public message: string;
  public constructor(
    code: T,
    public index: Index,
    parameter?: ReadonlyArray<string | number>
  ) {
    this.message = formatString(code, parameter);
  }
}
