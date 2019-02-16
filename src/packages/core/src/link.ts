import Operation from "./operation";
import { rxOperator } from "./operator";

import { Observable, Subject, range, concat, from, interval, pipe } from "rxjs";
import { map, filter, flatMap } from "rxjs/operators";

class Link {
  uses = []; // подготовка (пока что после)
  afterWares = []; // операции после запроса

  use(link) {
    this.uses.push(link.__execute ? link.__execute : link);
    //this.pipe = pipe(...this.uses);
  }

  useFn(fn) {
    this.use(rxOperator(fn));
  }

  afterWare(link) {
    this.afterWares.push(link.__execute ? link.__execute : link);
    //this.pipe = pipe(...this.uses);
  }

  afterWareFn(fn) {
    this.afterWare(rxOperator(fn));
  }

  __execute = source => {
    //TODO вероятно можно запилиь результат при помощи только одного pipe без observabe

    var o = Observable.create(subscriber => {
      source.subscribe(
        value => this.main(value, subscriber),
        err => subscriber.error(err),
        () => subscriber.complete()
      );
    });

    if (this.uses.length + this.afterWares.length > 0) {
      return o.pipe(
        ...this.uses,
        ...this.afterWares
      );
    } else {
      return o;
    }
  };

  request(operation) {
    operation = new Operation(operation);
    let obs = Observable.create(observer => this.main(operation, observer));
    return obs.pipe(
      ...this.uses,
      ...this.afterWares
    );
  }

  main(operation, observer) {
    observer.next(operation);
  }
}

export default Link;
