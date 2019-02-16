import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import gql from "graphql-tag";
import store from "../packages/store";
import Connect from "./Connect";
import getPokemon from "./graphql/query";
import setPokemon from "./graphql/mutation";
import { observer, ClientProvider } from "../packages/react";
import Debug from "../packages/react/src/debugRender";

import "./styles.css";

//console.log(React);
import Client from "../packages/client";

const client = new Client({
  uri: "https://graphql-pokemon.now.sh"
});

const env = { client: client };

function Main() {
  //observer();
  let pokemon = getPokemon({ id: 10 }, env);
  let setNumber = setPokemon({ id: 10 }, env);

  if (pokemon.loading) {
    return "...loading";
  }
  //console.log("мутация", setNumber.data);

  const onClick = () => {
    setNumber.fetch({
      number: "05"
    });
  };

  console.log("перерисовка");

  return (
    <div className="App">
      <h1> Hello CodeSandbox </h1>
      <button onClick={onClick}>click</button>
      <Debug data={pokemon.data} />
    </div>
  );
}

function App() {
  return (
    <ClientProvider client={client}>
      <Main />
    </ClientProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
