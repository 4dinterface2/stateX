/**
 * Вариант с прямой записью в store
 * его недостаток в том что функции нечего незнают про поля с параметрами
 * возможно пригодится для локального состояния
 */

//создает тип для результата
function updateTypes(data, state) {
  state[data.__typename] = state[data.__typename] || {};
}

//создает новую запись
function updateRecords(data, state) {
  var id = data.id === undefined ? "root" : data.id;
  var record = state[data.__typename][id] || new Record({});
  //console.log(record,);
  state[data.__typename][id] = record;
}

//обновляет поля
function updateFields(data, state) {
  var id = data.id === undefined ? "root" : data.id;
  var record = state[data.__typename][data.id];
  //console.log(data.id, data.$type, record, state)

  for (var i in data) {
    var item = data[i];
    if (item && item.__typename) {
      state.$write(item);
      item = state[item.__typename][item.id];
    } else if (Array.isArray(item)) {
      item = new List(item, record, i, state);
    }
    record.$set(i, item);
  }
}

// Использование
//this.$use(updateTypes); //обновить типы
//this.$use(updateRecords); //обновить записи
//this.$use(updateFields); //обновить поля
