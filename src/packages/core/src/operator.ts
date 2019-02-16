import Link from "./link";
/**
 * @example
 * const wait10 = operator((val,observable)=>{
 *  setTimeout(obsevable.next(val), 10)
 * })
 * client.use(wait10)
 *
 * @example
 * const wait = (delay) => operator((operation, observable)=>{
 *  setTimeout(obsevable.next(operation), delay)
 * })
 * client.use(wait(20));
 */
export const operator = fn => {
  const Op = class extends Link {
    main = fn;
  };
  return new Op();
};
