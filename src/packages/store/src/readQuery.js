//TODO при чтении научится использовать алиасы
//TODO очень тонкий момент с массивами, они могут быть и с скалярными значениями
import { getName, getStoreName } from "./utils/astUtils";
//import { observer } from "../../observable";

const readArray = (ast, v, cache, store) => {
  let res = [];
  for (var item of cache) {
    res.push(readField(ast, v, item, store));
  }
  return res;
};

//import visit from "./visitor";
//import { visit } from "graphql";
const readField = (ast, v, cache, store) => {
  //console.log(">", store);
  if (Array.isArray(cache)) {
    return readArray(ast, v, cache, store);
  } else if (ast.selectionSet) {
    return readSelectionSet(ast.selectionSet, v, cache, store);
  } else {
    return cache;
  }
};

const readSelectionSet = (ast, v, cache, store) => {
  // console.log("store ss=", store);
  let res;
  res = {};
  for (var f of ast.selections) {
    const name = getName(f, v);
    var storeName = getStoreName(f, v);
    res[f.name.value] = readField(f, v, cache[storeName], store);
  }
  return res;
};

const readOperation = (ast, v, cache, store) => {
  //console.log(ast);
  //console.log("Store op=", store);
  return readSelectionSet(ast.selectionSet, v, cache.query, store);
};

const readDocument = (ast, v, cache, store) => {
  return readOperation(ast.definitions[0], v, cache, store);
};

export default function readQuery(ast, v, store) {
  let res = readDocument(ast, v, store.cache, store);
  //console.log("res=", res);
  return res;
}
