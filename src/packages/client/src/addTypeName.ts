import rxOperator from "../../core/src/rxOperator";
import visitor from "../../graphql/visitor";

const createField = name => ({
  kind: "Field",
  alias: undefined,
  name: {
    kind: "Name",
    value: name
  },
  arguments: [],
  directives: [],
  selectionSet: undefined
});

//TODO хорошо бы заюзать интроспекцию
//чтобы случайно не добавиьт поля которых на сервере нет
let v = visitor({
  SelectionSet: (ast, payload, next) => {
    const result = {
      ...ast,
      ...next(payload)
    };
    result.selections.push(createField("__typename"));
    //result.selections.push(createField("id"));
    return result;
  },
  default: (ast, payload, next) => {
    return {
      ...ast,
      ...next(payload)
    };
  },
  defaultValue: ast => {
    return ast;
  }
});

/**
 * Добавляет typeName и id
 */
export default rxOperator((operation, observer) => {
  try {
    let res = v(operation.query, {});
    observer.next({
      ...operation,
      query: res
    });
  } catch (e) {
    //observer.error(e);
    //console.error(e);
  }
});
