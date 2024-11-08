import { RealEstateFilterMap } from '.';
import {
  REAL_ESTATE_FILTER_COUNTY_ARRAY,
  REAL_ESTATE_FILTER_DB_KEY_ARRAY,
  REAL_ESTATE_FILTER_INPUT_TYPE,
  REAL_ESTATE_STARI_ARRAY,
} from './real-estate.byty';

export enum REAL_ESTATE_FILTER_POZEMKY {
  TYP = 'typ',
  VYBER_LOKALITY = 'výběr lokality',
  CENA = 'cena',
  PLOCHA_POZEMKU = 'plocha',
  STARI = 'staří',
}
export type RealEstateSubTypePozemky =
  | 'bydlení'
  | 'komerční'
  | 'ostatní'
  | 'pole'
  | 'lesy'
  | 'rybníky'
  | 'sady/vinice'
  | 'zahrady'
  | 'ostatní';
export const REAL_ESTATE_POZEMKY_TYP_ARRAY: Array<RealEstateSubTypePozemky> = [
  'bydlení',
  'komerční',
  'ostatní',
  'pole',
  'lesy',
  'rybníky',
  'sady/vinice',
  'zahrady',
  'ostatní',
];
const REAL_ESTATE_POZEMKY_CENA_ARRAY = ['od', 'do'];
const REAL_ESTATE_POZEMKY_PLOCHA_POZEMKU_ARRAY = ['od', 'do'];

export const REAL_ESTATE_FILTER_POZEMKY_MAP: RealEstateFilterMap = {
  [REAL_ESTATE_FILTER_POZEMKY.TYP]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_POZEMKY_TYP_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.POD_TYP,
  },
  [REAL_ESTATE_FILTER_POZEMKY.VYBER_LOKALITY]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_FILTER_COUNTY_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.VYBER_LOKALITY,
  },
  [REAL_ESTATE_FILTER_POZEMKY.CENA]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.RANGE,
    array: REAL_ESTATE_POZEMKY_CENA_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.CENA,
  },
  [REAL_ESTATE_FILTER_POZEMKY.PLOCHA_POZEMKU]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.RANGE,
    array: REAL_ESTATE_POZEMKY_PLOCHA_POZEMKU_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.PLOCHA,
  },
  [REAL_ESTATE_FILTER_POZEMKY.STARI]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.DROPDOWN,
    array: REAL_ESTATE_STARI_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.STARI,
  },
};
