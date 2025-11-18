import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { ddbClient } from "../db/ client";

export const createUser = async (event: any) => {
  try {
    const body = JSON.parse(event.body);
    const item = {
      id: { S: uuidv4() },
      firstName: { S: body.firstName },
      lastName: { S: body.lastName },
      email: { S: body.email },
    };

    await ddbClient.send(
      new PutItemCommand({ TableName: "users", Item: item })
    );

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "Item added", item }),
    };
  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Could not fetch users" }),
    };
  }
};
