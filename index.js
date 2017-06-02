const escape = require("escape-string-regexp");

function filterTokens(string, opening, closing) {
  let validTokens = new RegExp(
    [...opening, ...closing]
      .map(e => {
        if (e instanceof RegExp) {
          let stringified = e.toString();
          return stringified.substring(1, stringified.length - 1);
        } else {
          return escape(e);
        }
      })
      .join("|"),
    "gm"
  );
  let elements = [];
  let token;
  while ((token = validTokens.exec(string)) !== null) {
    elements.push(token[0]);
  }

  return elements;
}

/**
 * Search for matching pairs in a string.
 *
 * @param {string} string - The data that should be checked
 * @param {string|Array} [opening] - Valid opening characters / words
 * @param {string|Array} [closing] - Valid closing characters / words
 * @returns {boolean}
 */
module.exports = function(string, opening = ["("], closing = [")"]) {
  let stack = [];
  let balanced = true;
  let elements = filterTokens(string, opening, closing);

  for (element of elements) {
    if (opening.includes(element)) {
      stack.push(element);
    } else {
      if (stack.length === 0) {
        balanced = false;
      } else {
        stack.pop();
      }
    }
  }

  return balanced && stack.length === 0;
};
