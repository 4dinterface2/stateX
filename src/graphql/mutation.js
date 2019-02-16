import gql from "graphql-tag";
import { mutation } from "../../packages/react";

let count = 0;
const changeNumber = mutation(({ operation, store }) => {
  const pokemon = store.getByType("Pokemon")["UG9rZW1vbjowMjU="];
  pokemon.number = operation.variables.number + "_" + count++;
  return pokemon;
});
export default changeNumber;
