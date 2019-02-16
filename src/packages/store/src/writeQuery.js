import { getName, getStoreName } from "./utils/astUtils";
import { normalizer } from "../../observable";
import { Record } from "../../observable";

const getOperationName = (ast, v) => {
  return ast.name ? ast.name.value : "unnamed";
};

//пишет массив
var writeArray = (ast, v, cache, value, store) => {
  let ret = normalizer([], store); //TODO вернет всегда новый !!!
  for (var val of value) {
    ret.push(writeField(ast, v, cache, val, store));
  }
  return ret;
};

//пишет поле тлт элемент массива
var writeField = (ast, v, cache, value, store) => {
  if (Array.isArray(value)) {
    return writeArray(ast, v, cache, value, store); //такая реализация позволяет существовать массиву в массиве
  } else if (ast.selectionSet) {
    return writeSelectionSet(ast.selectionSet, v, cache, value, store);
  } else {
    return value;
  }
};

var writeSelectionSet = (ast, v, cache, value, store) => {
  //alert(1);
  let res = cache;
  if (!res) {
    res = normalizer({ __typename: value.__typename, id: value.id }, store);
  }

  for (var f of ast.selections) {
    const storeName = getStoreName(f, v),
      name = getName(f, v);

    //TODO Отсутствие set приведет к тому что в случае отсутсвия поддержки к прокси
    //свойство потом будет недоступно
    res[storeName] = writeField(f, v, res[storeName], value[name], store);
    //res.$set(storeName, writeField(f, v, res[storeName], value[name], store));
  }
  return res;
};

var writeOperation = (ast, v, cache, value, store) => {
  const name = getOperationName(ast, v);
  //console.log("ast op=", ast.operation, store[ast.operation]);
  cache[ast.operation] = cache[ast.operation] || new Record({}, store.manager); //todo вероятно должен существовать с момента создания
  //console.log(operation);
  //`consol`e.log("operation=",operation)
  cache[ast.operation] = writeSelectionSet(
    ast.selectionSet,
    v,
    cache[ast.operation],
    value,
    store
  );
  return cache[ast.operation];
};

var writeDocument = (ast, v, cache, value, store) => {
  return writeOperation(ast.definitions[0], v, cache, value, store);
};

export default function writeQuery(ast, v, store, value) {
  let res = writeDocument(ast, v, store.cache, value, store);
  return res;
}
