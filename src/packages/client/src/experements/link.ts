let runMiddleware = (arr, operation) => {
  let count = 0;

  let cancel = () => {};

  let error = () => {};
  let next = () => {
    let next = result => {
      count++;
      if (count < arr.length) {
        arr[count](result, next, cancel, error);
      }
      return null;
    };
  };

  next(operation);
};

class Link {
  constructor(fn) {}

  before = [];
  after = [];
  final = [];

  fire() {}

  //отфильтровывет операции
  filter() {}

  //то что работает до запроса
  use(fn) {
    this.before.push(fn);
  }

  //то что работает после запроса
  useAfter() {}

  useFinal() {}
}
