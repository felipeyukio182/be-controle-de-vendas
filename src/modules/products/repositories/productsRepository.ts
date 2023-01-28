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
import { IReqDeleteProduct } from "../models/IReqDeleteProduct";
import { IReqGetProduct } from "../models/IReqGetProduct";
import { IReqPostProduct } from "../models/IReqPostProduct";
import { IReqPutProduct } from "../models/IReqPutProduct";

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

export const getProductDb = async ({
  username,
  productId,
}: IReqGetProduct): Promise<IProduct | null> => {
  const productDDB = await getProductDynamoDb({ username, productId });
  if (!productDDB) {
    return null;
  }
  return productDDBToProduct(productDDB);
};

const getProductDynamoDb = async ({
  username,
  productId,
}: IReqGetProduct): Promise<IProductDDB | null> => {
  const client = createDynamoDbClient();

  const queryCommand = new QueryCommand({
    TableName: dynamoDbTableName,
    KeyConditionExpression: "pk = :pk",
    FilterExpression: "product.id = :productId",
    ExpressionAttributeValues: {
      ":pk": { S: `${username}#products` },
      ":productId": { N: `${productId}` },
    },
  });

  try {
    const response = await client.send(queryCommand);
    const unmarshallItems = response.Items?.map(
      (item) => unmarshall(item) as IProductDDB
    );
    return unmarshallItems?.[0] ?? null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    client.destroy();
  }
};

export const postProductDb = async ({
  username,
  product: productWithoutId,
}: IReqPostProduct): Promise<number | null> => {
  let lastId = 0;
  const productsList = await getProductsDb(username);
  const lastProduct = productsList.pop();
  if (lastProduct) {
    lastId = lastProduct.id;
  }

  const product: IProduct = {
    id: lastId + 1,
    ...productWithoutId,
  };

  const personDDB: IProductDDB = {
    pk: `${username}#products`,
    sk: lastId + 1,
    product: product,
  };

  const httpStatus = await postProductDynamoDb(personDDB);
  if (!httpStatus) {
    return null;
  }
  return httpStatus;
};

const postProductDynamoDb = async (
  productDDB: IProductDDB
): Promise<number | null> => {
  const client = createDynamoDbClient();

  const putCommand = new PutItemCommand({
    TableName: dynamoDbTableName,
    Item: marshall(productDDB),
  });

  try {
    const response = await client.send(putCommand);
    return response.$metadata.httpStatusCode ?? null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    client.destroy();
  }
};

export const putProductDb = async ({
  username,
  product,
  productId,
}: IReqPutProduct): Promise<number | null> => {
  const productDDB: IProductDDB = {
    pk: `${username}#products`,
    sk: productId,
    product: product,
  };

  const httpStatus = await putProductDynamoDb(productDDB);
  if (!httpStatus) {
    return null;
  }
  return httpStatus;
};

const putProductDynamoDb = async (
  productDDB: IProductDDB
): Promise<number | null> => {
  const client = createDynamoDbClient();

  const marshallProductDDB = marshall(productDDB);

  const updateCommand = new UpdateItemCommand({
    TableName: dynamoDbTableName,
    Key: {
      pk: marshallProductDDB.pk,
      sk: marshallProductDDB.sk,
    },
    UpdateExpression: "SET product = :product",
    ExpressionAttributeValues: {
      ":product": marshallProductDDB.product,
    },
  });

  try {
    const response = await client.send(updateCommand);
    return response.$metadata.httpStatusCode ?? null;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    client.destroy();
  }
};

export const deleteProductDb = async ({
  username,
  productId,
}: IReqDeleteProduct): Promise<number | null> => {
  const itemDDB: IDynamoDbItem = {
    pk: `${username}#products`,
    sk: productId,
  };

  const httpStatus = await deleteProductDynamoDb(itemDDB);
  if (!httpStatus) {
    return null;
  }
  return httpStatus;
};

const deleteProductDynamoDb = async (
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
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    client.destroy();
  }
};

const productDDBToProduct = (productDDB: IProductDDB): IProduct => {
  return productDDB.product;
};
