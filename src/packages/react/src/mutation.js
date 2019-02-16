import React, { useState, useRef, useEffect } from "react";
import getStore from "./getStore";
import makeFetch from "./fetchers/clientFetch";
import makeFetchReduce from "./fetchers/reduceFetch";

//import memoize from "../utils/memoize";
export default (gql, reducer = o => o) => {
  //const _reducer = typeof gql === "function" ? gql : reducer;
  const injectFetch =
    typeof gql === "function" ? makeFetchReduce(gql) : makeFetch(gql, reducer);

  return (variables = {}, opts = {}) => {
    //состояние запроса
    const [state, update] = useState({
      data: null,
      loading: false,
      error: null
    });
    let client = opts.client || getStore();

    const fetch = injectFetch(client, variables, state, update);

    return {
      ...state,
      fetch: fetch
    };
  };
};