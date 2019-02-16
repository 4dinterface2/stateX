import rxOperator from "../../core/src/rxOperator";
let mapQuery = {};

/**
 * складывает очередь повторные запросы
 */
const waitValueSymbol = Symbol("waitResult");
export const registerQuery = rxOperator((operation, observer) => {
  if (operation.hash in mapQuery) {
    operation.result = operation.result || waitValueSymbol;
  } else {
    mapQuery[operation.hash] = [];
  }
  observer.next(operation);
});

export const finishQuery = rxOperator((operation, observer) => {
  if (operation.result != waitValueSymbol) {
    mapQuery[operation.hash].forEach(({ observer, operation: op }) => {
      observer.next({
        ...op,
        loading: operation.loading,
        result: operation.result
      });
    });
    delete mapQuery[operation.hash];
    observer.next(operation);
  } else {
    mapQuery[operation.hash].push({ observer, operation });
  }
});
