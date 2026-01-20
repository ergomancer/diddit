const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "Akash",
    email: "akashkhetan044@gmail.com",
    password: "akash@diddit",
  },
  {
    id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
    name: "Rumana",
    email: "rumana.i.fazir@gmail.com",
    password: "rumana@diddit",
  },
];

const tasks = [
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    userId: "410544b2-4001-4271-9855-fec4b6a6442a",
    title: "Seed",
    description: "Create seed data; Create seed route;",
    status: "completed",
  },
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    userId: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
    title: "Design the frontend",
    description: "Discuss the features; Create a design; Provide assets;",
    status: "pending",
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    userId: "410544b2-4001-4271-9855-fec4b6a6442a",
    title: "Implement authentication logic",
    description:
      "Implement the authentication backend; Implement the authentication frontend;",
    status: "completed",
  },
];

export { users, tasks };
