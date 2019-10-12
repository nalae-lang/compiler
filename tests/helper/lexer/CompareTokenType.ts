import { TokenBase, TokenTypes } from "token";

export function compareTokenType<T extends TokenBase>(
  token: T | null,
  match: TokenTypes
): token is T {
  expect(token).to.be.ok;
  if (token) {
    expect(token.type).to.equal(match);
  }
  return !!token;
}
