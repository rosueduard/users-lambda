import { handler } from "../../dist/index.js";

async function createUser() {

  const postEvent = {
    requestContext: {
      http: { method: "POST" },
    },
    body: JSON.stringify({ firstName: "Jhon", lastName: "Doe", email: "jhon.doe@example.com" }),
  };

  console.log("----- POST Test -----");
  const postResponse = await handler(postEvent);
  console.log(postResponse);
}

createUser();
