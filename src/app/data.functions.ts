import { SongsMapped } from './domain/interfaces';

export function mapData(res: SongsMapped) {
  const newRes: SongsMapped = {
    data: res.data.map((item) => ({
      id: item.id,
      code: item.code,
      name: item.name,
      description: item.description,
      year: item.year,
      quantity: item.quantity,
      inventoryStatus: item.inventoryStatus,
      artist: item.artist,
      image: item.image,
      rating: item.rating,
      isLoved: item.isLoved,
    })),
  };
  return newRes;
}
