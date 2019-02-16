import { Observable } from "rxjs";
//TODO надо по
//TODO нужно внимательнее изучить детали реализации RxJS

/**
 * Фабрика операторов
 * @example 1
 * const inc = rxOperator( (value, observer) => observer.next(value+1))
 *
 * @example 2
 * const add = (a)=>rxOperator( (value, observer) => observer.next(value+a))
 */
export default fn => source => {
  return Observable.create(subscriber => {
    source.subscribe(
      value => fn(value, subscriber),
      err => subscriber.error(err),
      () => subscriber.complete()
    );
  });
};
