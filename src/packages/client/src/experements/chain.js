/**
 * цепочка позволяющая встраивать observable и operators
 */
class Chain {
  uses = [];
  lastObj = this;

  use(link) {
    this.currentObj.subscribe(link);
    this.currentObj = new Subject();
    link.subscribe(this.currentObj);
  }

  pipe(...args) {
    this.currentObj.pipe(...args);
  }

  next(val) {
    console.log("val", val);
  }

  constructor() {
    this.firstObj = this.currentObj = new Subject();
    // super();
    //  this.queue = Observable.create(()=>{});
    //  this.queue.pipe(flatMap(()=>source1))
    //this.pipe(f => console.log("l", f));
  }

  request(operation) {
    this.next(323);
    const obs = new Subject();
    obs.pipe(filter(op => op.uuid === operation.uuid));
    this.subscribe(obs); //когда управление вернется отработает observer
    return obs;
  }

  subscribe(...args) {
    return this.currentObj.subscribe(...args);
  }
}

let count = 0;
var source1 = Observable.create(o => {
  setInterval(() => o.next(count++), 1000);
});

var store = new Subject();
store = store.pipe(
  map(i => {
    return i * 10;
  })
);

const l = new Link();
l.use(source1);
l.use(store);
l.subscribe({
  next: v => console.log("x", v)
});
