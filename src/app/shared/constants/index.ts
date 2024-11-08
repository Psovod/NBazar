import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBoxOpen, faBuilding, faCouch, faHome, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { REAL_ESTATE_FILTER_BYTY_MAP, REAL_ESTATE_FILTER_INPUT_TYPE } from './real-estate.byty';
import { REAL_ESTATE_FILTER_DOMY_MAP } from './real-estate.domy';
import { REAL_ESTATE_FILTER_POZEMKY_MAP } from './real-estate.pozemky';
import { REAL_ESTATE_FILTER_KOMERCNI_MAP } from './real-estate.komercni';
import { REAL_ESTATE_FILTER_OSTATNI_MAP } from './real-estate.ostatni';

export interface RealEstateFilterMap {
  [key: string]: RealEstateFilter;
}
export interface RealEstateFilter {
  dbKey: string;
  type: REAL_ESTATE_FILTER_INPUT_TYPE;
  array: Array<string>;
}

export enum REAL_ESTATE_TYPE {
  BYTY = 'byty',
  DOMY = 'domy',
  POZEMKY = 'pozemky',
  KOMERCNI = 'komerční',
  OSTATNI = 'ostatní',
}

export const REAL_ESTATE_FILTER_MAP = {
  [REAL_ESTATE_TYPE.BYTY]: REAL_ESTATE_FILTER_BYTY_MAP,
  [REAL_ESTATE_TYPE.DOMY]: REAL_ESTATE_FILTER_DOMY_MAP,
  [REAL_ESTATE_TYPE.POZEMKY]: REAL_ESTATE_FILTER_POZEMKY_MAP,
  [REAL_ESTATE_TYPE.KOMERCNI]: REAL_ESTATE_FILTER_KOMERCNI_MAP,
  [REAL_ESTATE_TYPE.OSTATNI]: REAL_ESTATE_FILTER_OSTATNI_MAP,
};

export const REAL_ESTATE_OBJECT = Object.fromEntries(
  Object.entries(REAL_ESTATE_TYPE).map(([key, value]) => [
    value,
    {
      type: value,
      filters: Object.entries(REAL_ESTATE_FILTER_MAP[value]).map(([name, values]) => ({
        name,
        values,
      })),
    },
  ])
);

export interface RealitySearch {
  name: REAL_ESTATE_TYPE;
  icon: IconDefinition;
}

export const REAL_ESTATE: Array<RealitySearch> = [
  {
    icon: faCouch,
    name: REAL_ESTATE_TYPE.BYTY,
  },
  {
    icon: faHome,
    name: REAL_ESTATE_TYPE.DOMY,
  },
  {
    icon: faLocationDot,
    name: REAL_ESTATE_TYPE.POZEMKY,
  },
  {
    icon: faBuilding,
    name: REAL_ESTATE_TYPE.KOMERCNI,
  },
  {
    icon: faBoxOpen,
    name: REAL_ESTATE_TYPE.OSTATNI,
  },
];
