import { IAddressDTO } from '../dtos/IAddressDTO';
import { Address } from '../infra/typeorm/entities/Address';

interface IAddressesRepository {
  create({
    street,
    number,
    complement,
    district,
    cep,
    city_id,
  }: IAddressDTO): Promise<Address>;
  findById(id: string): Promise<Address>;
  delete(id: string): Promise<void>;
}

export { IAddressesRepository };
