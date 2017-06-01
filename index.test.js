const isBalanced = require("./index.js");

test("if the setup basically works", () => {
  expect(true).toBe(true);
});

test("that it can detect balanced parentheses", () => {
  let balancedData = "(())";
  expect(isBalanced(balancedData)).toBe(true);
});

test("that it can detect unbalanced parentheses", () => {
  let unbalancedData = "())";
  expect(isBalanced(unbalancedData)).toBe(false);
});

test("that other characters can appear", () => {
  expect(isBalanced("((|())x)")).toBe(true);
  expect(isBalanced("(dsdsadasd((!)xxx)")).toBe(false);
});
