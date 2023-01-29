import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { IUser } from "../../../models/IUser";
import { IUserDDB } from "../../../models/dynamoDbModels/IUserDDB";
import createDynamoDbClient from "../../../shared/services/dynamoDb/createDynamoDbClient";
import { IReqLogin } from "../models/IReqLogin";
import { dynamoDbTableName } from "../../../shared/services/dynamoDb/config/dynamoDbTableName";
import { EnumDynamoPk } from "../../../shared/enums/EnumDynamoPk";

const findUserDb = async ({
  username,
  password,
}: IReqLogin): Promise<IUser | null> => {
  const users = await getUsersDynamoDb({ username, password });
  if (!users.length) {
    return null;
  }
  return userDDBToUser(users[0]);
};

const getUsersDynamoDb = async ({
  username,
  password,
}: IReqLogin): Promise<IUserDDB[]> => {
  const client = createDynamoDbClient();

  const queryCommand = new QueryCommand({
    TableName: dynamoDbTableName,
    KeyConditionExpression: "pk = :pk",
    FilterExpression: "#u.password = :password",
    ExpressionAttributeNames: {
      "#u": "user",
    },
    ExpressionAttributeValues: {
      ":pk": { S: `${username}#${EnumDynamoPk.users}` },
      ":password": { S: password },
    },
  });

  try {
    const response = await client.send(queryCommand);
    const unmarshallItems = response.Items?.map(
      (item) => unmarshall(item) as IUserDDB
    );
    return unmarshallItems ?? [];
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
