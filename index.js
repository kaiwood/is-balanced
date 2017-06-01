const escape = require("escape-string-regexp");

function filterTokens(string, opening, closing) {
  let validTokens = new RegExp(
    [...opening, ...closing]
      .map(e => {
        return e instanceof RegExp ? e : escape(e);
      })
      .join("|"),
    "g"
  );
  let elements = [];
  let token;
  while ((token = validTokens.exec(string)) !== null) {
    elements.push(token[0]);
  }

  return elements;
}

/**
 * Searches for matching pairs with a simple stack algorithm.
 *
 * @param {string} string - The data that should be checked
 * @param {Array} [opening] - Valid opening characters / words
 * @param {Array} [closing] - Valid closing characters / words
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

  return balanced && stack.length === 0 ? true : false;
};
