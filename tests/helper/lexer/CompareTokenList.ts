import { Token } from "token/interface";

export function compareTokenList(
  token: ReadonlyArray<Token>,
  typeList: ReadonlyArray<string>,
): void {
  expect(token.map(token => token.type)).to.deep.equal(typeList);
}
