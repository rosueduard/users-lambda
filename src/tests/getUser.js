import { handler } from "../../dist/index.js";

async function createUser() {

  const getEvent = {
    requestContext: {
      http: { method: "GET" },
    },
  };

  console.log("----- GET Test -----");
  const getResponse = await handler(getEvent);
  console.log(getResponse);
}

createUser();
