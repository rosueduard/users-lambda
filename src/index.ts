import { createUser } from "./handlers/createUser.js";
import { getUsers } from "./handlers/getUser.js";

export const handler = async (event: any) => {
  const method = event.requestContext.http.method;

  if (method === "POST") {
    return createUser(event);
  }

  if (method === "GET") {
    return getUsers(event);
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: "Not Found" }),
  };
};
