import { instanceToInstance } from 'class-transformer';

interface ItemList {
  id: string;
  name: string;
  subtitle?: string;
  avatar: string,
  city: string
  uf: string
}

class ItemListMap {
  static toDTO({
    id,
    name,
    subtitle,
    avatar,
    city,
    uf,
  }: ItemList): ItemList {
    const organization = instanceToInstance({
      id,
      name,
      subtitle,
      avatar,
      city,
      uf,
    });
    return organization;
  }
}

export { ItemListMap };
