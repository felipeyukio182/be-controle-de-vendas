/* eslint-disable @typescript-eslint/no-empty-interface */
import { IAddress, isAddress } from "./IAddress";

export interface IPerson {
  id: number;
  name: string;
  cpfCnpj: string;
  inscEst?: string;
  address: IAddress;
}

export const isPerson = (person?: object): person is IPerson => {
  if (!person) {
    return false;
  }
  return (
    "id" in person &&
    "name" in person &&
    "cpfCnpj" in person &&
    "inscEst" in person &&
    "address" in person &&
    !!person.address &&
    typeof person.address == "object" &&
    isAddress(person.address)
  );
};

export interface INewPerson extends Omit<IPerson, "id"> {}

export const isNewPerson = (person?: object): person is INewPerson => {
  if (!person) {
    return false;
  }
  return (
    "name" in person &&
    "cpfCnpj" in person &&
    "inscEst" in person &&
    "address" in person &&
    !!person.address &&
    typeof person.address == "object" &&
    isAddress(person.address)
  );
};
