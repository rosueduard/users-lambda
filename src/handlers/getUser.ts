import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const ddbClient = new DynamoDBClient({ region: "eu-north-1" });

export const getUsers = async (event: any) => {
  try {
    const data = await ddbClient.send(new ScanCommand({ TableName: "users" }));

    const users =
      data.Items?.map((i) => ({
        id: i.id.S!,
        firstName: i.firstName.S!,
        lastName: i.lastName.S!,
        email: i.email.S!,
      })) || [];

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(users),
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
