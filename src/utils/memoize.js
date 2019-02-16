var memoize = fn => {
  var memo = {};
  return (...values) => {
    const json = JSON.stringify(values);
    console.log(json);
    return json in memo ? memo[json] : (memo[json] = fn(...values));
  };
};
export default memoize;
