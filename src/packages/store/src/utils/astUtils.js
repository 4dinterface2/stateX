var getStoreName = (ast, v) => {
  let res = "";
  for (var i in ast.arguments) {
    const arg = ast.arguments[i];
    const name = arg.name.value;
    if (i > 0) {
      res += ",";
    }
    switch (arg.value.kind) {
      case "IntValue":
        res += `${name}:${arg.value.value}`;
        break;
      case "StringValue":
        res += `${name}:"${arg.value.value}"`;
        break;
    }
  }
  //console.log("ast=",ast);
  if (ast.arguments && ast.arguments.length > 0) {
    return ast.name.value + "(" + res + ")";
  }
  return ast.name.value;
};

var getName = (ast, v) => {
  return ast.name.value;
};

export { getName, getStoreName };
