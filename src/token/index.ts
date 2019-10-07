export enum TokenTypes {
  INDENT = "indent",
  STRING = "string",
  COMMENT = "comment",
  RAWCODE = "rawcode",
  NUMBER = "number",
  GRAMMER = "grammer",
  KEYWORD = "keyword",
  OPERATOR = "operator",
  END = "end"
}

export interface Index {
  start: number;
  end: number;
}

export interface Token {
  type: TokenTypes;
  index: Index;
}
