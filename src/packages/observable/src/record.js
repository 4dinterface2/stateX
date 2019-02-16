import observable from "./observable";

//TODO Чо-то я не втыкаю назначение storeMap
let storeMap = new WeakMap();

//Хотелось бы иметь чистый кэш
class Record {
  constructor(data, manager) {
    const self = this;
    this.data = data;
    const proxy = new Proxy(data, {
      get(obj, propName) {
        if (propName in self) {
          return self[propName];
        }
        ///console.log(">>", manager);
        //console.log("______", manager.observe);
        //console.log("-<", manager);
        manager.observe(obj, propName);
        return observable(obj[propName], manager); //TODO дорого постоянно создавать прокси
      },
      set(obj, propName, value) {
        //console.log("установка в прокси", propName);
        if (obj[propName] !== value) {
          obj[propName] = value;
          manager.update(obj, propName);
          return true;
        }
        return true; //TODO вероятно нужно вернуть false
      }
    });

    storeMap.set(proxy, manager);
    return proxy;
  }

  //Устанавливает поля, в том числе несуществующие
  $set(name, data) {
    // console.log(name);
    if (typeof name === "object") {
      for (const i in name) {
        this.$set(i, name[i]);
      }
    } else {
      //TODO начать слушать поле
      this.data[name] = data; //observer(data, storeMap.get(this));
    }
  }
}

export default Record;
//export function createRecord(data) {}
