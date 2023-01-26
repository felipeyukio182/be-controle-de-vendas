import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { IUser } from "../../../models/IUser";
import { IUserDDB } from "../../../models/IUserDDB";
import createDynamoDbClient from "../../../shared/services/dynamoDb/createDynamoDbClient";
import { IReqLogin } from "../models/IReqLogin";

const findUserDb = async ({
  username,
  password,
}: IReqLogin): Promise<IUser | null> => {
  const users = await getUsersDynamodb({ username, password });
  if (!users.length) {
    return null;
  }
  return userDDBToUser(users[0]);
};

const getUsersDynamodb = async ({
  username,
  password,
}: IReqLogin): Promise<IUserDDB[]> => {
  const client = createDynamoDbClient();

  const queryCommand = new QueryCommand({
    TableName: "controle-de-vendas",
    KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
    FilterExpression: "#u.password = :password",
    ExpressionAttributeNames: {
      "#u": "user",
    },
    ExpressionAttributeValues: {
      ":pk": { S: username },
      ":sk": { S: "user#" },
      ":password": { S: password },
    },
  });

  try {
    const response = await client.send(queryCommand);
    const unmarshallItems = response.Items?.map(
      (item) => unmarshall(item) as IUserDDB
    );
    return unmarshallItems ?? [];
  } catch (error) {
    console.log(error);
    return [];
  } finally {
    client.destroy();
  }
};

const userDDBToUser = (userDDB: IUserDDB): IUser => {
  return {
    username: userDDB.user.username,
    name: userDDB.user.name,
    email: userDDB.user.email,
    id: userDDB.user.id,
  };
};

export { findUserDb };
