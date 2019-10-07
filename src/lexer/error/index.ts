import { Index } from 'token';

import { ErrorCode } from './ErrorCode';

export class NalaeLexerError extends Error {
  name = "NalaeLexerError";
  index: Index;
  constructor(code: ErrorCode, index: Index) {
    super(code);
    this.index = index;
  }
}
