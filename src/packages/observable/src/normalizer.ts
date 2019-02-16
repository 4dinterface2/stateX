import Record from "./record";
import List from "./list";

/**
 * По сути задача данной подсистемы это нормализация
 * То есть нужно фиксировать типы в кэше
 *
 * в данный момент непонятно нафига сюда передаются другие типы
 */
export default (target, state) => {
  //TODO убедится что этого достаточно для инстанса рекорда
  if (target instanceof Record) {
    return target;
  }

  if (target instanceof List) {
    return target;
  }

  if (Array.isArray(target)) {
    return target; //new List(target, state);
  }

  if (typeof target === "object") {
    //если обьект уже существует
    //console.log("target=", target, state);
    if (
      target.__typename in state &&
      state.getByType(target.__typename)[target.id]
    ) {
      alert("Ахтунг!");
      const rec = state.getByType(target.__typename)[target.id];
      //TODO Внимание вероятнее тут будет трабла, так как в store Не хранятся прокси
      rec.$set(target); //установим новые значения
    }
    // // еосли не существует то создадим и зарегаем в store
    else {
      if (target.__typename && target.id) {
        state.writeRecord(target);
      }
    }
    return target;
  }
  return target;
};
