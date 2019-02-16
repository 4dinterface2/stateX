import Record from "./record";
import List from "./list";

//полагаю есть смысл кешировать уже созданные сущности под обьекты
const cache = new WeakMap();
// вероятно целесообразно передавать всем дочерним свойствам контекст
// и хранить кэш в нем, это аст возможность впринципе подписывать
// любые обьекты а не только компоненты ReactJS
//
// с другой стороны, глобальное свойство вполне себе позволит точно
// идентифицировать подписчика при условии что оно ставится и снимается
// синхронно
// в принципе достаточно в любом компоненте  вызвать Hook, observer
//

//TODO вероятно это стоит переименовать в Observable
//ХОТЯ в общем то это даже не обсервер
export default (target, manager, ctx) => {
  //TODO убедится что этого достаточно для инстанса рекорда
  if (target instanceof Record) {
    return target;
  }

  if (target instanceof List) {
    return target;
  }
  console.log("manager", manager);
  if (Array.isArray(target)) {
    return new List(target, manager);
  }

  if (typeof target === "object") {
    return new Record(target, manager);
  }

  return target;
};
