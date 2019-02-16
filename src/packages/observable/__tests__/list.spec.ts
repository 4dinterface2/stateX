import List from "../src/list";
import manager from "../src/core/manager";

describe("List tests", () => {
  test("push/pop тест", () => {
    const list = new List([], manager);
    manager.pushObserver("100", () => {
      //alert("Отработал list");
    });
    let x = list[0];
    manager.popObserver("100");
    list.push(10);
  });
});
