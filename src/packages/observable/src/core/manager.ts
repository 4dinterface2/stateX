//глобальный state, что-то я не уверен что он оправдан
// declare var window: any;
// declare var global: any;

// export function getGlobal() {
//   return typeof window !== "undefined" ? window : global;
// }
import Sheduler from "./sheduler";
import Reaction from "./reaction";

class StoreManager {
  stack = []; //observer'ы которые слушают
  keys = {}; //соответствие ключей функции update
  objects = new WeakMap(); //прослушиваемые обьекты (знают о всех подписанных обсерверах)
  sheduler: Sheduler;

  constructor() {
    this.sheduler = new Sheduler();
  }

  get currentObserver() {
    return this.stack[this.stack.length - 1];
  }

  //добавить обсервер
  pushObserver(uid, callback) {
    this.keys[uid] = this.keys[uid] || new Reaction(uid, callback, this);
    this.keys[uid].reset();
    this.stack.push(this.keys[uid]);
  }

  //удалить обсервер
  popObserver() {
    this.stack.pop();
  }

  destroyObserver = uid => {
    if (uid in this.keys) {
      this.keys[uid].destroy();
      delete this.keys[uid];
    }
  };

  /**
   * Ставит свойство под наблюдение
   */
  observe(obj, propName) {
    if (!this.stack.length) {
      return;
    }

    let observebleObject;
    if (this.objects.has(obj)) {
      observebleObject = this.objects.get(obj);
    } else {
      observebleObject = {};
      this.objects.set(obj, observebleObject);
    }
    //создадим SET для текущего свойства и записи в нем
    const propObservable = observebleObject[propName] || new Set();
    observebleObject[propName] = propObservable;
    propObservable.add(this.currentObserver);
    this.currentObserver.connect(propObservable);
    //console.log("слушаем", propName, propObservable);
  }

  update(obj, propName) {
    console.log("Обновляю", propName);
    if (!this.objects.has(obj)) {
      return;
    }

    const observebleObject = this.objects.get(obj);
    const reactions = observebleObject[propName];

    if (reactions) {
      this.sheduler.shedule(reactions);
    }
  }
  //TODO переименовать в destroy
  clearObserver(uid) {}
}

//непонятно нафига mobx понадобился глобальный state
const manager = new StoreManager();
export { StoreManager };
export default manager;

//let obj = {};
// // manager.pushObserver("100", () => null);
// // manager.observe(obj, "name");
// // manager.observe(obj, "name2");
// // manager.observe(obj, "name3");
// // manager.popObserver("100");
// // manager.update(obj, "name");
// // manager.update(obj, "name2");
// // manager.update(obj, "name3");
// console.log("manager=", manager);
