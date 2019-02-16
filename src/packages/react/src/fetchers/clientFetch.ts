import { useState, useRef, useEffect } from "react";

const makeFetch = (gql, reducer) => (client, variables, state, update) => {
  let oldSubscribe;

  //отпишемся от события в случае уничтожения компонента
  useEffect(() => {
    return () => {
      if (oldSubscribe) {
        console.log("oldsubscribe=", oldSubscribe);
        oldSubscribe();
      }
    };
  }, variables); //Убедится что работает

  return (vars = variables) => {
    const operation = {
      query: gql,
      variables: { ...variables, ...vars }
    };

    const reducerParams = {
      operation: operation,
      next: state => update(state), //вызовет обновление компонета
      store: client.store //доступ к store
    };

    if (oldSubscribe) {
      oldSubscribe();
    }

    //первый вызов редьюсера
    //если в редьюсере ошибка то откатываем все изменения до точки
    //TODO оправдана ли стратегия откатывать первые изменения?
    const rollback = client.savePoint();

    try {
      //ТЕОРИТИЧЕСКИ МОЖНО ИСПОЛЬЗОВАТЬ СИНХРОННЫЕ ТРАНЗАКЦИИ
      //ХОТЯ СМЫСЛА ВРОДЕ НЕ МНОГО
      reducer(reducerParams);
    } catch (e) {
      console.log(e);
      rollback(); //откат до точки
      update({
        data: null,
        loading: false,
        error: e
      });
      return;
    }

    //полноценный запрос
    let s = client.request(operation);
    oldSubscribe = s.subscribe({
      next: operation => {
        const result = reducer({
          ...reducerParams,
          operation
        });
        update({
          data: result,
          loading: false,
          error: null
        });
      }
    });
    return s;
  };
};

export default makeFetch;
