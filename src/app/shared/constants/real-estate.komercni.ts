import { RealEstateFilterMap } from '.';
import {
  REAL_ESTATE_FILTER_COUNTY_ARRAY,
  REAL_ESTATE_FILTER_DB_KEY_ARRAY,
  REAL_ESTATE_FILTER_INPUT_TYPE,
  REAL_ESTATE_STARI_ARRAY,
  REAL_ESTATE_STAV_OBJEKTU_ARRAY,
} from './real-estate.byty';

export enum REAL_ESTATE_FILTER_KOMERCNI {
  TYP = 'typ',
  STAV_OBJEKTU = 'stav objektu',
  VYBER_LOKALITY = 'výběr lokality',
  CENA = 'cena',
  PLOCHA_UZITNA = 'plocha',
  STARI = 'staří',
}
export type RealEstateSubTypeKomercni =
  | 'kanceláře'
  | 'sklady'
  | 'výroba'
  | 'obchodní prostory'
  | 'ubytování'
  | 'restaurace'
  | 'zemědělský'
  | 'činžovní dům'
  | 'ostatní'
  | 'ordinace'
  | 'apartmány';
export const REAL_ESTATE_KOMERCNI_TYP_ARRAY: Array<RealEstateSubTypeKomercni> = [
  'kanceláře',
  'sklady',
  'výroba',
  'obchodní prostory',
  'ubytování',
  'restaurace',
  'zemědělský',
  'činžovní dům',
  'ostatní',
  'ordinace',
  'apartmány',
];
const REAL_ESTATE_KOMERCNI_STAV_OBJEKTU_ARRAY = REAL_ESTATE_STAV_OBJEKTU_ARRAY;
const REAL_ESTATE_KOMERCNI_CENA_ARRAY = ['od', 'do'];
const REAL_ESTATE_KOMERCNI_PLOCHA_UZITNA_ARRAY = ['od', 'do'];

export const REAL_ESTATE_FILTER_KOMERCNI_MAP: RealEstateFilterMap = {
  [REAL_ESTATE_FILTER_KOMERCNI.TYP]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_KOMERCNI_TYP_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.POD_TYP,
  },
  [REAL_ESTATE_FILTER_KOMERCNI.STAV_OBJEKTU]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_KOMERCNI_STAV_OBJEKTU_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.STAV_OBJEKTU,
  },
  [REAL_ESTATE_FILTER_KOMERCNI.VYBER_LOKALITY]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_FILTER_COUNTY_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.VYBER_LOKALITY,
  },
  [REAL_ESTATE_FILTER_KOMERCNI.CENA]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.RANGE,
    array: REAL_ESTATE_KOMERCNI_CENA_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.CENA,
  },
  [REAL_ESTATE_FILTER_KOMERCNI.PLOCHA_UZITNA]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.RANGE,
    array: REAL_ESTATE_KOMERCNI_PLOCHA_UZITNA_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.PLOCHA,
  },
  [REAL_ESTATE_FILTER_KOMERCNI.STARI]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.DROPDOWN,
    array: REAL_ESTATE_STARI_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.STARI,
  },
};
