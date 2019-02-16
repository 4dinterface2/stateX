import readQuery from "./readQuery";
import writeQuery from "./writeQuery";

import { observable, manager } from "../../observable";
import Link from "../../core/src/link";
import MemoryCache from "../src/cache/memory";

class RecordType {}

class Store extends Link {
  constructor(props = {}) {
    super();
    this.cache = props.cache || new MemoryCache();
    this.manager = manager;
  }

  //утилита возвращающая записи по типу
  //
  getByType(name) {
    return (
      this.cache[name] || (this.cache[name] = observable({}, this.manager))
    );
  }

  /**
   * Независимо от того мутация ли это или событие
   */
  main(operation, observer) {
    const nextOperation = {
      ...operation
    };
    //если есть результат то его нужно записать в хранилище
    if (operation.query && operation.result) {
      nextOperation.result = this.writeQuery(
        operation.query,
        operation.variables,
        operation.result.data
      );
      //console.log("write 1", operation.result);
    } else if (operation.query) {
      nextOperation.result = this.readQuery(
        operation.query,
        operation.variables
      );
    }
    //console.log("store=", this);
    observer.next(nextOperation);
    console.log("store", this.cache);
  }

  readQuery(ast, variables) {
    //var v=SchemaDirectiveVisitor();
    return readQuery(ast, variables, this);
    //console.log(ast);
  }

  //TODO возвращает весь store
  writeQuery(ast, variables, data) {
    //update(ast, {});
    return writeQuery(ast, variables, this, data);
  }

  writeRecord(record) {
    let type = this.getByType(record.__typename);
    type[record.id] = record;
  }
  /*$write(data) {
    this.middlwares.forEach(fn => fn.call(this, data, this));
  }*/
}

export default Store;
