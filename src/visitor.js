const nodeDescr = node => {
  return {
    name: node.name && node.name.value
  };
};

var fields = ["definitions", "document", "selectionSet", "selections", "field"];

export default (node, config) => {
  var res = {};
  let q = [{ node, result: res }];
  let index = 0;

  //входы
  while ((item = q[index])) {
    if (!item.node) break;

    const node = item.node;
    const enterKind = "enter" + node.kind;

    const descr = nodeDescr(node);
    let childContext = item.result;

    if (config[enterKind]) {
      childContext = config[enterKind]({
        parentResult: item.result,
        descr: nodeDescr(node),
        node
      });
    }

    if (Array.isArray(node)) {
      for (var item of node) {
        q.push({
          node: item,
          result: childContext
        });
      }
    }

    for (var i of fields) {
      if (i in node) {
        q.push({
          node: node[i],
          result: childContext
        });
      }
    }
    index++;
    //console.log(node.kind);
  }

  //выходы
  while (q.length > 0) {
    let item = q.pop();
    let node = item.node;
    if (!node) continue;

    const leaveKind = "leave" + node.kind;
    //console.log(">>", item.node && item.node.kind, item.result );
    //console.log(leaveKind);
    if (config[leaveKind]) {
      config[leaveKind]({
        result: item.result,
        descr: nodeDescr(node),
        node
      });
    }
  }
  return res;
};
