interface IAddressDTO {
  street?: string,
  number?: string,
  complement?: string,
  district?:string,
  cep?:number,
  city_id?: number;
}

export { IAddressDTO };
