//import { StoreManager } from "../manager";

export default class Reaction {
  subscriptions = new Set();
  name: string;
  callback: any;
  manager: any; //StoreManager;

  constructor(name, callback, manager) {
    this.name = name;
    this.callback = callback;
    this.manager = manager;
  }

  /**
   * Сбрасывает все подписки
   */
  reset() {
    for (var reactions of this.subscriptions) {
      reactions.delete(this);
    }
    this.subscriptions.clear();
  }

  destroy() {
    this.reset();
  }

  connect(item) {
    this.subscriptions.add(item);
  }

  run() {
    console.log("Сработаа реакция ", this.name);
    this.callback();
  }
}
