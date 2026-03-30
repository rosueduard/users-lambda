import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const deleteUser = async (id: string) => {
  const ddbClient = new DynamoDBClient({ region: "eu-north-1" });
  await ddbClient.send(
    new DeleteItemCommand({
      TableName: "users",
      Key: { id: { S: id } },
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "User deleted", id }),
  };
};
