import Link from "../../core/src/link";
import { execute, makePromise } from "apollo-link";
import { createHttpLink } from "apollo-link-http";

class HttpLink extends Link {
  constructor({ uri }) {
    super();
    //console.log("uri=", uri);
    this.httpLink = createHttpLink({ uri: uri });
  }
  main(operation, observer) {
    //пропускаем запрос если у него уже есть результат
    if (operation.result) {
      observer.next(operation);
      return;
    }
    //setTimeout(() => observer.next(operation * 100), 1000);
    execute(this.httpLink, {
      query: operation.query,
      variables: operation.variables
    }).subscribe({
      next: data => {
        operation.result = data;
        operation.loading = false;
        observer.next(operation);
      }
    });
  }
}
export default HttpLink;
