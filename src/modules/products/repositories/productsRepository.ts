import {
  DeleteItemCommand,
  PutItemCommand,
  QueryCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { IDynamoDbItem } from "../../../models/dynamoDbModels/IDynamoDbItem";
import { IProductDDB } from "../../../models/dynamoDbModels/IProductDDB";
import { IProduct } from "../../../models/IProduct";
import { dynamoDbTableName } from "../../../shared/services/dynamoDb/config/dynamoDbTableName";
import createDynamoDbClient from "../../../shared/services/dynamoDb/createDynamoDbClient";

// import { IProductDDB } from "../../../models/dynamoDbModels/IProductDDB";
// import { IReqDeletePerson } from "../models/IReqDeletePerson";
// import { IReqGetPerson } from "../models/IReqGetPerson";
// import { IReqPostPerson } from "../models/IReqPostPerson";
// import { IReqPutPerson } from "../models/IReqPutPerson";

export const getProductsDb = async (username: string): Promise<IProduct[]> => {
  const productsDDB = await getProductsDynamoDb(username);
  const products = productsDDB.map((productDDB) =>
    productDDBToProduct(productDDB)
  );
  return products;
};

const getProductsDynamoDb = async (
  username: string
): Promise<IProductDDB[]> => {
  const client = createDynamoDbClient();

  const queryCommand = new QueryCommand({
    TableName: dynamoDbTableName,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": { S: `${username}#products` },
    },
    ScanIndexForward: true,
  });

  try {
    const response = await client.send(queryCommand);
    const unmarshallItems = response.Items?.map(
      (item) => unmarshall(item) as IProductDDB
    );
    return unmarshallItems ?? [];
  } catch (error) {
    console.log(error);
    return [];
  } finally {
    client.destroy();
  }
};

// export const getPersonDb = async ({
//   username,
//   personId,
// }: IReqGetPerson): Promise<IProduct | null> => {
//   const personDDB = await getPersonDynamoDb({ username, personId });
//   if (!personDDB) {
//     return null;
//   }
//   return personDDBToPerson(personDDB);
// };

// const getPersonDynamoDb = async ({
//   username,
//   personId,
// }: IReqGetPerson): Promise<IProductDDB | null> => {
//   const client = createDynamoDbClient();

//   const queryCommand = new QueryCommand({
//     TableName: dynamoDbTableName,
//     KeyConditionExpression: "pk = :pk",
//     FilterExpression: "person.id = :personId",
//     ExpressionAttributeValues: {
//       ":pk": { S: `${username}#people` },
//       ":personId": { N: `${personId}` },
//     },
//   });

//   try {
//     const response = await client.send(queryCommand);
//     const unmarshallItems = response.Items?.map(
//       (item) => unmarshall(item) as IProductDDB
//     );
//     return unmarshallItems?.[0] ?? null;
//   } catch (error) {
//     console.log(error);
//     return null;
//   } finally {
//     client.destroy();
//   }
// };

// export const postPersonDb = async ({
//   username,
//   person: personWithoutId,
// }: IReqPostPerson): Promise<number | null> => {
//   let lastId = 0;
//   const peopleList = await getPeopleDb(username);
//   const lastPerson = peopleList.pop();
//   if (lastPerson) {
//     lastId = lastPerson.id;
//   }

//   const person: IProduct = {
//     id: lastId + 1,
//     ...personWithoutId,
//   };

//   const personDDB: IProductDDB = {
//     pk: `${username}#people`,
//     sk: lastId + 1,
//     person: person,
//   };

//   const httpStatus = await postPersonDynamoDb(personDDB);
//   if (!httpStatus) {
//     return null;
//   }
//   return httpStatus;
// };

// const postPersonDynamoDb = async (
//   personDDB: IProductDDB
// ): Promise<number | null> => {
//   const client = createDynamoDbClient();

//   const putCommand = new PutItemCommand({
//     TableName: dynamoDbTableName,
//     Item: marshall(personDDB),
//   });

//   try {
//     const response = await client.send(putCommand);
//     return response.$metadata.httpStatusCode ?? null;
//   } catch (error) {
//     console.log(error);
//     return null;
//   } finally {
//     client.destroy();
//   }
// };

// export const putPersonDb = async ({
//   username,
//   person,
//   personId,
// }: IReqPutPerson): Promise<number | null> => {
//   const personDDB: IProductDDB = {
//     pk: `${username}#people`,
//     sk: personId,
//     person: person,
//   };

//   const httpStatus = await putPersonDynamoDb(personDDB);
//   if (!httpStatus) {
//     return null;
//   }
//   return httpStatus;
// };

// const putPersonDynamoDb = async (
//   personDDB: IProductDDB
// ): Promise<number | null> => {
//   const client = createDynamoDbClient();

//   const marshallPersonDDB = marshall(personDDB);

//   const updateCommand = new UpdateItemCommand({
//     TableName: dynamoDbTableName,
//     Key: {
//       pk: marshallPersonDDB.pk,
//       sk: marshallPersonDDB.sk,
//     },
//     UpdateExpression: "SET person = :person",
//     ExpressionAttributeValues: {
//       ":person": marshallPersonDDB.person,
//     },
//   });

//   try {
//     const response = await client.send(updateCommand);
//     return response.$metadata.httpStatusCode ?? null;
//   } catch (error) {
//     console.log(error);
//     return null;
//   } finally {
//     client.destroy();
//   }
// };

// export const deletePersonDb = async ({
//   username,
//   personId,
// }: IReqDeletePerson): Promise<number | null> => {
//   const itemDDB: IDynamoDbItem = {
//     pk: `${username}#people`,
//     sk: personId,
//   };

//   const httpStatus = await deletePersonDynamoDb(itemDDB);
//   if (!httpStatus) {
//     return null;
//   }
//   return httpStatus;
// };

// const deletePersonDynamoDb = async (
//   itemDDB: IDynamoDbItem
// ): Promise<number | null> => {
//   const client = createDynamoDbClient();

//   const marshallItemDDB = marshall(itemDDB);

//   const updateCommand = new DeleteItemCommand({
//     TableName: dynamoDbTableName,
//     Key: {
//       pk: marshallItemDDB.pk,
//       sk: marshallItemDDB.sk,
//     },
//   });

//   try {
//     const response = await client.send(updateCommand);
//     return response.$metadata.httpStatusCode ?? null;
//   } catch (error) {
//     console.log(error);
//     return null;
//   } finally {
//     client.destroy();
//   }
// };

const productDDBToProduct = (productDDB: IProductDDB): IProduct => {
  return productDDB.product;
};
