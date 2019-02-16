let uniqId = 0;
/**
 * регистриурует операцию
 * каждой операции дается номер, с оответственно откатываюся
 *  все операции номером выше чем у точки отката
 */
export default class UndoRedo {
  constructor(size) {
    this.size = size;
  }
  operations = []; //операции на отмену
  cancelOperations = []; //отмененные операции которые могут быть восстановлены

  /**
   * возвращает функцмю к которой происходит откат
   */
  savePoint() {
    const count = uniqId++;
    return () => this.undo(count);
  }

  /**
   * отменяет операции до операции с count
   */
  undo(count) {
    let op;
    while ((op = this.operations[this.operations.length - 1])) {
      if (op.count > count) {
        this.operations.pop();
        op.undo(); //отменим операцию
        this.cancelOperations.push(op);
      }
    }
  }

  redo(count) {}
  registerOperation(op) {
    //вызывает сохранение
    this.operations.push({
      undo: op(),
      redo: op,
      count: uniqId++
    });
    this.cancelOperations = [];
  }
}
