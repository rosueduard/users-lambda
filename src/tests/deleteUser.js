import { handler } from "../../dist/index.js";

async function deleteUser() {

  const deleteEvent = {
    requestContext: {
      http: { method: "DELETE" },
    },
    pathParameters: {
      id: "9280b1dd-3d8b-4ea3-9f44-31e5c650a65f",
    },
  };

  console.log("----- DELETE Test -----");
  const deleteResponse = await handler(deleteEvent);
  console.log(deleteResponse);
}

deleteUser();
