"use strict";
// import { getUsers } from "./handlers/get.js";
// import { getUserById } from "./handlers/getById.js";
// import { createUser } from "./handlers/create.js";
// import { updateUser } from "./handlers/update.js";
// import { deleteUser } from "./handlers/delete.js";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    console.log("Event:", JSON.stringify(event, null, 2));
    const method = event.requestContext.http.method;
    const path = event.requestContext.http.path;
    // Pentru rute simple:
    //   if (method === "GET" && path === "/users") {
    //     return getUsers(event);
    //   }
    //   if (method === "GET" && path.match(/^\/users\/[a-zA-Z0-9-]+$/)) {
    //     const id = path.split("/")[2];
    //     return getUserById(id);
    //   }
    //   if (method === "POST" && path === "/users") {
    //     return createUser(event);
    //   }
    //   if (method === "PUT" && path.match(/^\/users\/[a-zA-Z0-9-]+$/)) {
    //     const id = path.split("/")[2];
    //     return updateUser(event, id);
    //   }
    //   if (method === "DELETE" && path.match(/^\/users\/[a-zA-Z0-9-]+$/)) {
    //     const id = path.split("/")[2];
    //     return deleteUser(id);
    //   }
    return {
        statusCode: 404,
        body: JSON.stringify({ message: "Not Found" }),
    };
};
exports.handler = handler;
