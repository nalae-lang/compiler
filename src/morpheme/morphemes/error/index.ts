import { NalaeErrorBase } from "utils/ErrorBase";

import { MorphemeErrorCode } from "./ErrorCode";

export class NalaeMorphemeError extends NalaeErrorBase<MorphemeErrorCode> {
  public name = "NalaeMorphemeError";
}
