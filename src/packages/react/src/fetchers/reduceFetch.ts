const makeFetchReduce = _reducer => (client, variables, state, update) => {
  return (vars = variables) => {
    const result = _reducer({
      operation: {
        variables: { ...variables, ...vars },
        result: state.data
      },
      next: state => update(state), //вызовет обновление компонета
      store: client.store //доступ к store
    });
    update({
      data: result,
      loading: false,
      error: null
    });
  };
};
export default makeFetchReduce;
