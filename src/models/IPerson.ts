import { IAddress } from "./IAddress";

export interface IPerson {
  id: number;
  name: string;
  cpfCnpj: string;
  inscEst?: string;
  address: IAddress;
}
