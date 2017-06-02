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

test("that it can differentiate between tokens at the beginning and in the middle of a line", () => {
  let balancedData = `
  def foo
  end
  puts "something" if true
  `;

  let unbalancedData = `
  def foo
  end
  puts "something" if true
  end
  `;

  let moreUnbalancedData = `
  def foo
    if true
  end
`;

  expect(isBalanced(balancedData, [/^\s*?if/, "def"], ["end"])).toBe(true);
  expect(isBalanced(unbalancedData, [/^\s*?if/, "def"], ["end"])).toBe(false);
  expect(isBalanced(moreUnbalancedData, [/^\s*?if/, "def"], ["end"])).toBe(
    false
  );
});

test("if opening/closing args work as a single string too", () => {
  let balancedData = "{{}}";
  let unbalancedData = "({{})";

  expect(isBalanced(balancedData, "{", "}")).toBe(true);
  expect(isBalanced(unbalancedData, "{", "}")).toBe(false);
});

test("more cases", () => {
  const openings = [
    /^\s*?if/,
    /^\s*?unless/,
    "while",
    "for",
    "do",
    "def",
    "class",
    "module",
    "case"
  ];

  const closings = ["end"];

  const text = `
  def foo
    if true

    end
  end
`;

  const unbalanced = `
  def foo
    if true

    end
  end
`;

  const balanced = `
  def foo
    puts "foo" if true
  end
`;

  expect(isBalanced(text, openings, closings)).toBe(true);
  expect(isBalanced(unbalanced, openings, closings)).toBe(true);
});
