import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { IPersonDDB } from "../../../models/dynamoDbModels/IPersonDDB";
import { IPerson } from "../../../models/IPerson";
import { dynamoDbTableName } from "../../../shared/services/dynamoDb/config/dynamoDbTableName";
import createDynamoDbClient from "../../../shared/services/dynamoDb/createDynamoDbClient";
import { IReqGetPerson } from "../models/IReqGetPerson";

export const getPeopleDb = async (username: string): Promise<IPerson[]> => {
  const peopleDDB = await getPeopleDynamoDb(username);
  const people = peopleDDB.map((personDDB) => personDDBToPerson(personDDB));
  return people;
};

async function getPeopleDynamoDb(username: string): Promise<IPersonDDB[]> {
  const client = createDynamoDbClient();

  const queryCommand = new QueryCommand({
    TableName: dynamoDbTableName,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": { S: `${username}#people` },
    },
    ScanIndexForward: true,
  });

  try {
    const response = await client.send(queryCommand);
    const unmarshallItems = response.Items?.map(
      (item) => unmarshall(item) as IPersonDDB
    );
    return unmarshallItems ?? [];
  } catch (error) {
    console.log(error);
    return [];
  } finally {
    client.destroy();
  }
}

export const getPersonDb = async ({
  username,
  personId,
}: IReqGetPerson): Promise<IPerson | null> => {
  const personDDB = await getPersonDynamoDb({ username, personId });
  if (!personDDB) {
    return null;
  }
  return personDDBToPerson(personDDB);
};

const getPersonDynamoDb = async ({
  username,
  personId,
}: IReqGetPerson): Promise<IPersonDDB | null> => {
  const client = createDynamoDbClient();

  const queryCommand = new QueryCommand({
    TableName: dynamoDbTableName,
    KeyConditionExpression: "pk = :pk",
    FilterExpression: "person.id = :personId",
    ExpressionAttributeValues: {
      ":pk": { S: `${username}#people` },
      ":personId": { N: `${personId}` },
    },
  });

  try {
    const response = await client.send(queryCommand);
    const unmarshallItems = response.Items?.map(
      (item) => unmarshall(item) as IPersonDDB
    );
    return unmarshallItems?.[0] ?? null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    client.destroy();
  }
};

// export const postPersonDb = async ({
//   username,
//   person,
// }: any): Promise<any | null> => {
//   const peopleList = await getPeopleDb(username);
//   // const lastIndex = peopleList.sort()

//   const status = await postPersonDynamoDb({ username, person });
//   if (!status) {
//     return null;
//   }
//   return status;
// };

// const postPersonDynamoDb = async ({
//   username,
//   person,
// }: any): Promise<IPersonDDB | null> => {
//   const client = createDynamoDbClient();

//   const queryCommand = new QueryCommand({
//     TableName: dynamoDbTableName,
//     KeyConditionExpression: "pk = :pk and begins_with(sk, :sk)",
//     FilterExpression: "person.id = :personId",
//     ExpressionAttributeValues: {
//       ":pk": { S: username },
//       ":sk": { S: "people#" },
//       // ":personId": { N: `${personId}` },
//     },
//   });

//   try {
//     const response = await client.send(queryCommand);
//     const unmarshallItems = response.Items?.map(
//       (item) => unmarshall(item) as IPersonDDB
//     );
//     return unmarshallItems?.[0] ?? null;
//   } catch (error) {
//     console.log(error);
//     return null;
//   } finally {
//     client.destroy();
//   }
// };

const personDDBToPerson = (personDDB: IPersonDDB): IPerson => {
  return personDDB.person;
};
