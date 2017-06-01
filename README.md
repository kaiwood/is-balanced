# is-balanced

## Installation

`npm install is-balanced`

## Usage

This module checks for balanced things in a given string, mainly for parsing programming languages, HTML, etc.

Without additional arguments, it defaults to searching for parentheses.
```javascript
const isBalanced = require("is-balanced");

let text = "((()))";
console.log(isBalanced(text)); // => true

text = "(()"
console.log(isBalanced(text)); // => false
```

For searching for e.g. curly braces:

```javascript
let text = "{{}}";
console.log(isBalanced(text, "{", "}");
```

My personal need is for parsing Ruby code to find balanced if..end or def..end statements, so the opening and closing arguments work with multiple opening/closing arguments as well with regular expressions:

```javascript
let text = `
if true
  [1, 2, 3].each do |number|
    puts number if number % 2 == 0
  end
end
`

console.log(isBalanced(text, [/^\s*?if/, "do", "def"], ["end"])) // => true
```
