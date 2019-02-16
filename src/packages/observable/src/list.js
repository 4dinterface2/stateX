//TODO Нужно слушать сам массив или length для операций вроде push/pop
import observer from "./observable";
let storeMap = new WeakMap();

const operations = {
  push: (manager, data) => (...params) => {
    data.push(...params);
  },

  pop: (manager, data) => () => {
    const item = data.pop();
    return observer(item, manager);
  },

  shift: (manager, data) => () => {
    const item = data.shift();
    return observer(item, manager);
  },

  unshift: (manager, data) => (...params) => {
    data.unshift(...params);
  }
};

//List
function List(data, manager) {
  storeMap.set(this, manager);
  const self = this;
  this.data = data;

  const proxy = new Proxy(data, {
    get(obj, propName) {
      if (propName in operations) {
        return operations[propName](manager, data);
      }
      manager.observe(obj, propName);
      return observer(obj[propName], manager); //TODO дорого постоянно создавать прокси
    },
    set(obj, propName, value) {
      if (obj[propName] !== value) {
        obj[propName] = value;
        manager.update(obj, propName);
        return true;
      }
      return true; //TODO вероятно нужно вернуть false
    }
  });
  return proxy;
}

export default List;
