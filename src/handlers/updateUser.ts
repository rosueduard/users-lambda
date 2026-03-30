import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const ddbClient = new DynamoDBClient({ region: "eu-north-1" });

export const updateUser = async (event: any) => {
  try {
    // Luăm ID-ul din calea URL (configurată ca /users/{userId})
    const id = event.pathParameters?.userId;
    const body = JSON.parse(event.body);

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing userId in path" }),
      };
    }

    // Definim comanda de update
    const command = new UpdateItemCommand({
      TableName: "users",
      Key: {
        id: { S: id }, // Cheia primară a obiectului pe care îl modificăm
      },
      // UpdateExpression definește CE modificăm
      // Folosim alias-uri (#f, #l, #e) pentru a evita conflictele cu cuvinte rezervate DynamoDB
      UpdateExpression: "SET #fn = :fn, #ln = :ln, #em = :em",
      ExpressionAttributeNames: {
        "#fn": "firstName",
        "#ln": "lastName",
        "#em": "email",
      },
      ExpressionAttributeValues: {
        ":fn": { S: body.firstName },
        ":ln": { S: body.lastName },
        ":em": { S: body.email },
      },
      // ReturnValues: "ALL_NEW" ne returnează obiectul așa cum arată DUPĂ update
      ReturnValues: "ALL_NEW",
    });

    const response = await ddbClient.send(command);

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        message: "User updated successfully",
        updatedAttributes: response.Attributes,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ message: "Could not update user" }),
    };
  }
};
