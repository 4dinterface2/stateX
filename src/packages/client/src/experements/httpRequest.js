import { execute, makePromise } from "apollo-link";

export default httpLink => operation =>
  execute(httpLink, {
    query: operation.query,
    variables: operation.variables
  });
