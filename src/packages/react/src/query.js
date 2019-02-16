import React, { useState, useRef, useEffect } from "react";
import getStore from "./getStore";
import makeFetch from "./fetchers/clientFetch";
import makeFetchReduce from "./fetchers/reduceFetch";
import { observer } from "./observer";

//import memoize from "../utils/memoize";
export default (gql, reducer = o => o.operation.result) => {
  //const _reducer = typeof gql === "function" ? gql : reducer;
  console.log(gql);
  const injectFetch =
    typeof gql === "function" ? makeFetchReduce(gql) : makeFetch(gql, reducer);

  return (variables = {}, opts = {}) => {
    observer();
    //состояние запроса
    const [state, update] = useState({
      data: null,
      loading: false,
      error: null
    });
    let client = opts.client || getStore();

    const fetch = injectFetch(client, variables, state, update);

    //Подписка на операции
    useEffect(() => {
      fetch(variables);
    }, variables); //TODO Надо убедится что

    return {
      ...state,
      fetch: fetch
    };
  };
};
