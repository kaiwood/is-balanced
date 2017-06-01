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

test("that it can use tokens that or not the default parenthesis", () => {
  let balancedData = `
  if true
    # something awesome inside this block
  end
  `;

  let unbalancedData = `
  if false

  def foo
    # something even more awesome inside this method
  end
  `;

  expect(isBalanced(balancedData, ["if", "def"], ["end"])).toBe(true);
  expect(isBalanced(unbalancedData, ["if", "def"], ["end"])).toBe(false);
});
