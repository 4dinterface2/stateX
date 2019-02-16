//import { StoreManager } from "../manager";
import { Reaction } from "./reaction";

export default class Sheduler {
  manager: any; //StoreManager;
  pendingReactions = new Set();

  constructor(manager: any) {
    this.manager = manager;
  }

  shedule(reactions) {
    for (let reaction of reactions) {
      this.pendingReactions.add(reaction);
    }

    if (!this.timeout) {
      this.timeout = setTimeout(this.runReactions, 0);
    }
  }

  runReactions = () => {
    this.timeout = null;
    for (var reaction of this.pendingReactions) {
      reaction.run();
      //console.log("выполняю реакцию", reaction);
    }
    this.pendingReactions.clear();
  };
}
