//import hash from "object-hash";
/**
 * Транспотный обьект для операции
 */
//TODO extensions которые приходят с сервера могут находится в result, нужно ли для них отдельное поле

//можно попробывать ограничить установку не открытых свойств
export default class Operation {
  query: any; //ЗАПРОС
  variables = {}; // optional
  operationName = ""; // optional
  context = {}; // optional (контекст операции, хидеры и тому подобное)
  extensions = {}; // optional
  result = null; // optional (результат исполнения операции, ну или часть контекста)
  //getContext = () => {}; //? НУЖНО ЛИ ?

  hash: string; //КЛЮЧ

  constructor(operation) {
    //todo рассмотреть случай передачи уже существующего хэша
    this.query = operation.query;
    this.variables = operation.variables || {};
    //TODO здесь нужно использовать чтонибудь быстрое и практичное
    this.hash = JSON.stringify([operation.query, operation.variables]);

    this.operationName = operation.operationName;
    this.context = operation.context || {};
    this.extensions = operation.extensions || {};
    this.result = operation.result || null;
  }
}
