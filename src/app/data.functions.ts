import { SongsMapped, TitlesMapped } from './domain/interfaces';

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

export function mapTitles(res: TitlesMapped) {
  const newRes: TitlesMapped = {
    rows: res?.rows?.map((item) => ({
      tconst: item.tconst,
      titletype:
        item.titletype === (null || undefined)
          ? item.titleType
          : item.titletype,
      originaltitle:
        item.originaltitle === (null || undefined)
          ? item.originalTitle
          : item.originaltitle,
      primarytitle:
        item.primarytitle === (null || undefined)
          ? item.primarytitle
          : item.primarytitle,
      isadult:
        item.isadult === (null || undefined) ? item.isAdult : item.isadult,
      startyear:
        item.startyear === (null || undefined)
          ? item.startYear
          : item.startyear,
      endyear:
        item.endyear === (null || undefined) ? item.endYear : item.endyear,
      runtimeminutes: item.runtimeminutes,
      genres: item.genres,
    })),
  };
  return newRes;
}
