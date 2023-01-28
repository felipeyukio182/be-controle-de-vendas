export interface IAddress {
  city: string; // cidade
  state: string; // estado
  district: string; // bairro
  street: string; // logradouro/rua
  number: string; // numero
}

export const isAddress = (address?: object): address is IAddress => {
  if (!address) {
    return false;
  }
  return (
    "city" in address &&
    "state" in address &&
    "district" in address &&
    "street" in address &&
    "number" in address
  );
};
