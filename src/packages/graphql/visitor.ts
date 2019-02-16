const scanArray = (ast, data = {}, callbacks = {}) => {
  const next = data => {
    const result = [];
    for (let i in ast) {
      if (typeof ast[i] == "object") {
        result.push(scan(ast[i], data, callbacks));
      }
    }
    return result.length ? result : null;
  };
  return next(data);
};

const scan = (ast, data = {}, callbacks = {}) => {
  const next = data => {
    const result = {};
    for (let i in ast) {
      if (Array.isArray(ast[i])) {
        let r = scanArray(ast[i], data, callbacks);
        if (r) {
          result[i] = r;
        }
      } else if (typeof ast[i] == "object") {
        let r = scan(ast[i], data, callbacks);
        result[i] = r;
      } else if (callbacks["defaultValue"]) {
        result[i] = callbacks["defaultValue"](ast[i], data, callbacks);
      }
    }

    return result;
  };
  if (callbacks[ast.kind]) {
    return callbacks[ast.kind](ast, data, next);
  } else if (callbacks["default"]) {
    return callbacks["default"](ast, data, next);
  } else {
    return next(data);
  }
};

function Visitor(callbacks) {
  return (ast, vars = {}) => {
    return scan(ast, vars, callbacks);
  };
}

export default Visitor;
