import { createUser } from "./handlers/createUser.js";
import { deleteUser } from "./handlers/deleteUser.js";
import { getUsers } from "./handlers/getUser.js";
import { updateUser } from "./handlers/updateUser.js"; // Import nou

export const handler = async (event: any) => {
  console.log("event:", event);

  const method = event.requestContext.http.method;
  const path = event.requestContext.http.path;

  // 1. Rute fără ID (Colecție)
  if (method === "POST" && path.includes("/users")) {
    return createUser(event);
  }

  if (method === "GET" && path.endsWith("/users")) {
    return getUsers(event);
  }

  // 2. Rute cu ID (Resursă specifică)
  // Verificăm dacă path-ul se termină cu /users/{id}
  const isUserWithId = /\/users\/[a-zA-Z0-9-]+$/.test(path);

  if (isUserWithId) {
    const segments = path.split("/");
    const id = segments[segments.length - 1];

    if (method === "DELETE") {
      return deleteUser(id);
    }

    if (method === "PUT" || method === "PATCH") {
      return updateUser(event);
    }

    // Opțional: GET single user
    // if (method === "GET") return getUserById(id);
  }

  return {
    statusCode: 404,
    body: JSON.stringify({
      message: "Not Found - edited",
      debug: { method, path },
    }),
  };
};
