import Record from "../src/record";
import manager from "../src/core/manager";

describe("List tests", () => {
  it("push/pop", done => {
    //expect.assertions(1);
    const record = new Record({}, manager);
    manager.pushObserver("1", () => console.log("x"));
    manager.pushObserver("2", () => {
      console.log("Сработал вызов 2");
      done();
    });
    record.x;
    manager.popObserver("2");
    manager.popObserver("1");
    record.x = 100;
    //expect(true).toBe(false)
  });
});
