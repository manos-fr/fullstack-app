export interface Song {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  year?: number;
  quantity?: number;
  inventoryStatus?: string;
  artist?: string;
  image?: string;
  rating?: number;
  isLoved?: boolean;
}
export interface Title {
  tconst: string;
  titletype: string;
  titleType?: string;
  originaltitle: string;
  endYear?: number;
  startYear?: number;
  isAdult?: number;
  originalTitle?: string;
  primarytitle: string;
  isadult: number;
  startyear: number;
  endyear: number;
  runtimeminutes: number;
  genres: string;
}

export interface Notifications {
  id?: string;
  name?: string;
  description?: string;
  artist?: string;
}
export interface SongsMapped {
  data: Song[];
}
export interface TitlesMapped {
  rows: Title[];
}
export interface NewTitle {
  tconst: string;
  genres: string;
  startYear: number;
  originalTitle: string;
}
