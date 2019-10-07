import { Token, TokenTypes } from "token";

export function compareTokenType<T extends Token>(
  token: T | null,
  match: TokenTypes
): token is T {
  expect(token).to.be.ok;
  if (token) {
    expect(token.type).to.be.equal(match);
  }
  return !!token;
}
