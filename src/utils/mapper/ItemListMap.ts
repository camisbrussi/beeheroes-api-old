import { instanceToInstance } from 'class-transformer';

interface ItemList {
  id: string;
  name: string;
  subtitle?: string;
  image_url: string,
  city: string
  uf: string
}

class ItemListMap {
  static toDTO({
    id,
    name,
    subtitle,
    image_url,
    city,
    uf,
  }: ItemList): ItemList {
    const organization = instanceToInstance({
      id,
      name,
      subtitle,
      image_url,
      city,
      uf,
    });
    return organization;
  }
}

export { ItemListMap };
