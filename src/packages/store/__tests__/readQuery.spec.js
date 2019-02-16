// import Store from "../index";
// //import writeQuery from "./writeQuery";
// import gql from "graphql-tag";

// const writeObjects = {
//   user: {
//     id: 0,
//     name: "100500",
//     __typename: "User"
//   },
//   users: [
//     {
//       id: 1,
//       name: "user 0",
//       __typename: "User"
//     },
//     {
//       id: 2,
//       name: "user 1",
//       __typename: "User"
//     }
//   ]
// };

// //запишем массив
// const writeUsers = gql`
//   {
//     users(filter: "test") {
//       id
//       name
//       __typename
//     }
//   }
// `;

// describe("read array", () => {
//   test("read array", () => {
//     let store = new Store();
//     store.writeQuery(writeUsers, {}, writeObjects);
//     const res = store.readQuery(writeUsers, {}, writeObjects);
//     //console.log("result=", res);
//     // expect(res).toEqual({
//     //    'users(filter:"test")': writeObjects.users
//     // });
//   });
// });
