// req.then(res => console.log(res));
const nextWrapper = () => {};

//Вероятно функция должна вернуть Observeble, который будкт срабатывать столько раз сколько потребуется
const runMiddleware = async (arr, operation) => {
  let next = count => async operation => {
    if (count < arr.length) {
      return await arr[count](operation, next(count + 1));
    }
    return operation;
  };
  let r = await next(0)(operation);
  console.log("r=", r);
};

const calc = async (operation, next) => {
  operation++;
  console.log("op", operation);
  setTimeout(() => next(operation), 1000);
  return operation;
};

let res = runMiddleware([calc, calc, calc], 0).then(res => {
  console.log(res);
});
