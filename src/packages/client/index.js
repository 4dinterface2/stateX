//import {  } from "rxjs";
import gql from "graphql-tag";
import { map, filter, flatMap } from "rxjs/operators";
import Client from "./src/client";
import HttpLink from "./src/httpLink";
import Store from "../store/src/store";

const httpLink = new HttpLink({ uri: "https://graphql-pokemon.now.sh" });
//httpLink.use(map(i => i * 3));

import { rxOperator } from "../core/src/rxOperator";
export default Client;

// const op = name => {
//   return rxOperator((v, observer) => {
//     console.log(name, "=", v);
//     observer.next(v);
//   });
// };

// let req = gql`
//   {
//     pokemon(name: "Pikachu") {
//       id
//       number
//       __typename
//     }
//   }
// `;

// const store = new Store();

// const l = new Client();
// l.use(httpLink);
// //l.use(httpLink);

// l.use(op("ivan "));
// l.use(store);

// l.use(map(i => (i.name = "213") && i));
// let s = l.request({
//   query: req,
//   variables: {}
// });

// s.subscribe({
//   next: v => console.log("hello1", v, store.cache)
// });
