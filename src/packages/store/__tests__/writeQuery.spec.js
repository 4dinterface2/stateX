import Store from "../index";
//import writeQuery from "../src/writeQuery";
import gql from "graphql-tag";

const writeObjects = {
  user: {
    id: 0,
    name: "100500",
    __typename: "User"
  },
  users: [
    {
      id: 1,
      name: "user 0",
      __typename: "User"
    },
    {
      id: 2,
      name: "user 1",
      __typename: "User"
    }
  ]
};

//запишем обьект
const writeUser = gql`
  {
    user(id: 0) {
      id
      name
      __typename
    }
  }
`;
describe("write object", () => {
  test("write query", () => {
    let store = new Store({});
    store.writeQuery(writeUser, {}, writeObjects);
    console.log("result 1=", store);
    expect(store.cache.query).toEqual({
      "user(id:0)": writeObjects.user
    });
  });
});

//запишем массив
const writeUsers = gql`
  {
    users(filter: "test") {
      id
      name
      __typename
    }
  }
`;

describe("write array", () => {
  test("write array", () => {
    let store = new Store();
    const res = store.writeQuery(writeUsers, {}, writeObjects);
    console.log("result 2222=", store.cache.query);
    expect(store.cache.query).toEqual({
      'users(filter:"test")': writeObjects.users
    });
  });
});
