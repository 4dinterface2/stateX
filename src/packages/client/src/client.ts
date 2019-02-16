import { createHttpLink } from "apollo-link-http";
import HttpLink from "./httpLink";
import Link from "../../core/src/link";
import Store from "../../store/src/store";
import { registerQuery, finishQuery } from "./queryManager";
import addTypeName from "./addTypeName";
import UndoRedo from "../../undoRedo";

//import makeReuest from "./requestMiddlewares";
export default class Client extends Link {
  constructor(params = {}) {
    super();
    this.afterWare(addTypeName); //add __typename

    if (params.uri) {
      this.afterWare(registerQuery); //борьба с дублирующими вызовами
      this.afterWare(new HttpLink({ uri: params.uri }));
      this.afterWare(finishQuery); //борьба с дублирующими вызовами
    }

    this.undoRedo = new UndoRedo();
    this.store = params.store || new Store();
    this.afterWare(this.store);
  }

  //вернет savePoint
  savePoint() {
    this.undoRedo.savePoint();
  }
}
