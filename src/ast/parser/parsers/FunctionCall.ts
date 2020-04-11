import { ParserTokenBase } from "../interface";
import { ParserTokenTypes } from "../../types/ParserTokenTypes";
import { IdentifierToken } from "../../../morpheme/morphemes/IdentifierMorpheme";

export interface FunctionCallToken extends ParserTokenBase {
  readonly type: ParserTokenTypes.FUNCTION_CALL;
  readonly name: IdentifierToken;
}
