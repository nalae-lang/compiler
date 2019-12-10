import { TokenBase, TokenTypes } from "token/interface";

export function expectTokenType<T extends TokenBase, TT extends TokenTypes>(
  token: T | null,
  type: TT,
): asserts token is T extends { type: TT } ? T : never {
  expect(token).to.be.ok;
  if (token !== null) {
    expect(token.type).to.equal(type);
  }
}
