import {
  AttributeValue,
  DeleteItemCommand,
  PutItemCommand,
  QueryCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { IDynamoDbItem } from "../../../models/dynamoDbModels/IDynamoDbItem";
import { IPersonDDB } from "../../../models/dynamoDbModels/IPersonDDB";
import { IPerson } from "../../../models/IPerson";
import { EnumDynamoPk } from "../../../shared/enums/EnumDynamoPk";
import { dynamoDbTableName } from "../../../shared/services/dynamoDb/config/dynamoDbTableName";
import createDynamoDbClient from "../../../shared/services/dynamoDb/createDynamoDbClient";
import { IReqDeletePerson } from "../models/IReqDeletePerson";
import { IReqGetPerson } from "../models/IReqGetPerson";
import { IReqPostPerson } from "../models/IReqPostPerson";
import { IReqPutPerson } from "../models/IReqPutPerson";

export const getPeopleDb = async (username: string): Promise<IPerson[]> => {
  const peopleDDB = await getPeopleDynamoDb(username);
  const people = peopleDDB.map((personDDB) => personDDBToPerson(personDDB));
  return people;
};

const getPeopleDynamoDb = async (
  username: string,
  lastEvaluatedKey?: Record<string, AttributeValue>
): Promise<IPersonDDB[]> => {
  const client = createDynamoDbClient();

  const queryCommand = new QueryCommand({
    TableName: dynamoDbTableName,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": { S: `${username}#${EnumDynamoPk.people}` },
    },
    ExclusiveStartKey: lastEvaluatedKey,
    ScanIndexForward: true,
  });

  try {
    const peopleDDB: IPersonDDB[] = [];
    let otherPeopleDDB: IPersonDDB[] = [];

    const response = await client.send(queryCommand);
    const unmarshallItems =
      response.Items?.map((item) => unmarshall(item) as IPersonDDB) ?? [];

    if (response.LastEvaluatedKey) {
      otherPeopleDDB = await getPeopleDynamoDb(
        username,
        response.LastEvaluatedKey
      );
    }

    peopleDDB.push(...unmarshallItems, ...otherPeopleDDB);
    return peopleDDB;
  } finally {
    client.destroy();
  }
};

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
      ":pk": { S: `${username}#${EnumDynamoPk.people}` },
      ":personId": { N: `${personId}` },
    },
  });

  try {
    const response = await client.send(queryCommand);
    const unmarshallItems = response.Items?.map(
      (item) => unmarshall(item) as IPersonDDB
    );
    return unmarshallItems?.[0] ?? null;
  } finally {
    client.destroy();
  }
};

export const postPersonDb = async ({
  username,
  person: personWithoutId,
}: IReqPostPerson): Promise<number | null> => {
  let lastId = 0;
  const peopleList = await getPeopleDb(username);
  const lastPerson = peopleList.pop();
  if (lastPerson) {
    lastId = lastPerson.id;
  }

  const person: IPerson = {
    id: lastId + 1,
    ...personWithoutId,
  };

  const personDDB: IPersonDDB = {
    pk: `${username}#${EnumDynamoPk.people}`,
    sk: lastId + 1,
    person: person,
  };

  const httpStatus = await postPersonDynamoDb(personDDB);
  if (!httpStatus) {
    return null;
  }
  return httpStatus;
};

const postPersonDynamoDb = async (
  personDDB: IPersonDDB
): Promise<number | null> => {
  const client = createDynamoDbClient();

  const putCommand = new PutItemCommand({
    TableName: dynamoDbTableName,
    Item: marshall(personDDB),
  });

  try {
    const response = await client.send(putCommand);
    return response.$metadata.httpStatusCode ?? null;
  } finally {
    client.destroy();
  }
};

export const putPersonDb = async ({
  username,
  person,
  personId,
}: IReqPutPerson): Promise<number | null> => {
  const personDDB: IPersonDDB = {
    pk: `${username}#${EnumDynamoPk.people}`,
    sk: personId,
    person: person,
  };

  const httpStatus = await putPersonDynamoDb(personDDB);
  if (!httpStatus) {
    return null;
  }
  return httpStatus;
};

const putPersonDynamoDb = async (
  personDDB: IPersonDDB
): Promise<number | null> => {
  const client = createDynamoDbClient();

  const marshallPersonDDB = marshall(personDDB);

  const updateCommand = new UpdateItemCommand({
    TableName: dynamoDbTableName,
    Key: {
      pk: marshallPersonDDB.pk,
      sk: marshallPersonDDB.sk,
    },
    UpdateExpression: "SET person = :person",
    ExpressionAttributeValues: {
      ":person": marshallPersonDDB.person,
    },
  });

  try {
    const response = await client.send(updateCommand);
    return response.$metadata.httpStatusCode ?? null;
  } finally {
    client.destroy();
  }
};

export const deletePersonDb = async ({
  username,
  personId,
}: IReqDeletePerson): Promise<number | null> => {
  const itemDDB: IDynamoDbItem = {
    pk: `${username}#${EnumDynamoPk.people}`,
    sk: personId,
  };

  const httpStatus = await deletePersonDynamoDb(itemDDB);
  if (!httpStatus) {
    return null;
  }
  return httpStatus;
};

const deletePersonDynamoDb = async (
  itemDDB: IDynamoDbItem
): Promise<number | null> => {
  const client = createDynamoDbClient();

  const marshallItemDDB = marshall(itemDDB);

  const updateCommand = new DeleteItemCommand({
    TableName: dynamoDbTableName,
    Key: {
      pk: marshallItemDDB.pk,
      sk: marshallItemDDB.sk,
    },
  });

  try {
    const response = await client.send(updateCommand);
    return response.$metadata.httpStatusCode ?? null;
  } finally {
    client.destroy();
  }
};

const personDDBToPerson = (personDDB: IPersonDDB): IPerson => {
  return personDDB.person;
};
