export default {
  $type: "Query",
  id: "root",
  users: [
    {
      $type: "User",
      id: 0,
      name: "ivan",
      roles: null,
      friends: [
        {
          $type: "User",
          id: 1,
          name: "ivan",
          friends: [],
          roles: [
            {
              $type: "Role",
              id: 100,
              name: "admin"
            }
          ]
        }
      ]
    },
    {
      $type: "User",
      id: 1,
      name: "ivan",
      'friends("sex":"woman")': [],
      roles: [
        {
          $type: "Role",
          id: 100,
          name: "admin"
        }
      ]
    }
  ]
};
