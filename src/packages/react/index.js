import getStore from "./src/getStore";
import _observer from "./src/observer";
import _query from "./src/query";
import _mutation from "./src/mutation";
import { ClientProvider, useClient } from "./src/provider";
export const query = _query;
export const mutation = _mutation;
export const oserver = _observer;
export { ClientProvider, useClient };
