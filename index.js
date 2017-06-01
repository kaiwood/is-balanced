module.exports = function(string) {
  let stack = [];
  let balanced = true;

  let elements = string.split("");
  elements = elements.filter(e => {
    let allowedTokens = /\(|\)/;
    return e.match(allowedTokens);
  });

  for (element of elements) {
    if (element === "(") {
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
