import { RealEstateFilterMap } from '.';
import {
  REAL_ESTATE_FILTER_COUNTY_ARRAY,
  REAL_ESTATE_FILTER_DB_KEY_ARRAY,
  REAL_ESTATE_FILTER_INPUT_TYPE,
  REAL_ESTATE_STARI_ARRAY,
} from './real-estate.byty';

export enum REAL_ESTATE_FILTER_OSTATNI {
  TYP = 'typ',
  VYBER_LOKALITY = 'výběr lokality',
  CENA = 'cena',
  STARI = 'staří',
}
export type RealEstateSubTypeOstatni =
  | 'garáž'
  | 'garážové stání'
  | 'mobilheim'
  | 'vinný sklep'
  | 'půdní prostor'
  | 'ostatní';
export const REAL_ESTATE_OSTATNI_TYP_ARRAY: Array<RealEstateSubTypeOstatni> = [
  'garáž',
  'garážové stání',
  'mobilheim',
  'vinný sklep',
  'půdní prostor',
  'ostatní',
];
const REAL_ESTATE_OSTATNI_CENA_ARRAY = ['od', 'do'];

export const REAL_ESTATE_FILTER_OSTATNI_MAP: RealEstateFilterMap = {
  [REAL_ESTATE_FILTER_OSTATNI.TYP]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_OSTATNI_TYP_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.POD_TYP,
  },
  [REAL_ESTATE_FILTER_OSTATNI.VYBER_LOKALITY]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_FILTER_COUNTY_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.VYBER_LOKALITY,
  },
  [REAL_ESTATE_FILTER_OSTATNI.CENA]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.RANGE,
    array: REAL_ESTATE_OSTATNI_CENA_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.CENA,
  },
  [REAL_ESTATE_FILTER_OSTATNI.STARI]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.DROPDOWN,
    array: REAL_ESTATE_STARI_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.STARI,
  },
};
