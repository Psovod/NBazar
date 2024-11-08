import { RealEstateFilter, RealEstateFilterMap } from '.';
export enum REAL_ESTATE_FILTER_DB_KEY_ARRAY {
  TYP = 'type',
  TYP_TRANSAKCE = 'transaction_type',
  POD_TYP = 'sub_type',
  STAV_OBJEKTU = 'condition',
  VELIKOST = 'room_type',
  VYBER_LOKALITY = 'location',
  CENA = 'price',
  NECO_NAVIC = 'additional_equipment',
  STAVBA = 'building_material',
  ENERGETICKA_TRIDA = 'energy_consumption',
  VLATNICTVI = 'ownership_type',
  VYBAVENI = 'furniture',
  PATRO = 'floor',
  PLOCHA = 'area',
  STARI = 'age',
  POPIS = 'info',
}
export enum REAL_ESTATE_FILTER_INPUT_TYPE {
  CHECKBOX = 'checkbox',
  DROPDOWN = 'dropdown',
  INPUT = 'input',
  RANGE = 'range',
}
export enum REAL_ESTATE_FILTER_BYTY {
  TYP = 'typ',
  STAV_OBJEKTU = 'stav objektu',
  VYBER_LOKALITY = 'výber lokality',
  CENA = 'cena',
  NECO_NAVIC = 'něco navíc',
  STAVBA = 'stavba',
  ENERGETICKA_TRIDA = 'energetická třída',
  VLATNICTVI = 'vlastnictví',
  VYBAVENI = 'vybavení',
  PATRO = 'patro',
  PLOCHA = 'užitná plocha',
  STARI = 'staří inzerátu',
}
export type RealEstateFilterCounty =
  | 'Hlavní město Praha'
  | 'Středočeský kraj'
  | 'Jihočeský kraj'
  | 'Plzeňský kraj'
  | 'Karlovarský kraj'
  | 'Ústecký kraj'
  | 'Liberecký kraj'
  | 'Královéhradecký kraj'
  | 'Pardubický kraj'
  | 'Vysočina'
  | 'Jihomoravský kraj'
  | 'Olomoucký kraj'
  | 'Zlínský kraj'
  | 'Moravskoslezský kraj';
export const REAL_ESTATE_FILTER_COUNTY_ARRAY = [
  'Hlavní město Praha',
  'Středočeský kraj',
  'Jihočeský kraj',
  'Plzeňský kraj',
  'Karlovarský kraj',
  'Ústecký kraj',
  'Liberecký kraj',
  'Královéhradecký kraj',
  'Pardubický kraj',
  'Vysočina',
  'Jihomoravský kraj',
  'Olomoucký kraj',
  'Zlínský kraj',
  'Moravskoslezský kraj',
];
export const REAL_ESTATE_STARI_ARRAY = ['bez omezení', 'den', 'posledních 7 dní', 'posledních 30 dní'];
export type RealEstateCondition =
  | 'velmi dobrý'
  | 'dobrý'
  | 'špatný'
  | 've výstavbě'
  | 'developerské projekty'
  | 'novostavba'
  | 'k demolici'
  | 'před rekonstrukcí'
  | 'po rekonstrukcí'
  | 'v rekonstrukci';

export const REAL_ESTATE_STAV_OBJEKTU_ARRAY: Array<RealEstateCondition> = [
  'velmi dobrý',
  'dobrý',
  'špatný',
  've výstavbě',
  'developerské projekty',
  'novostavba',
  'k demolici',
  'před rekonstrukcí',
  'po rekonstrukcí',
  'v rekonstrukci',
];
export type RealEstateEnergyConsumption =
  | 'A - Mimořádně úsporná'
  | 'B - Velmi úsporná'
  | 'C - Úsporná'
  | 'D - Méně úsporná'
  | 'E - Nehospodárná'
  | 'F - Velmi nehospodárná'
  | 'G - Mimořádně nehospodárná';
export const REAL_ESTATE_ENERGETICKA_TRIDA_ARRAY: Array<RealEstateEnergyConsumption> = [
  'A - Mimořádně úsporná',
  'B - Velmi úsporná',
  'C - Úsporná',
  'D - Méně úsporná',
  'E - Nehospodárná',
  'F - Velmi nehospodárná',
  'G - Mimořádně nehospodárná',
];
export type RealEstateSubTypeByty =
  | 'pokoj'
  | '1+kk'
  | '1+1'
  | '2+kk'
  | '2+1'
  | '3+kk'
  | '3+1'
  | '4+kk'
  | '4+1'
  | '5+kk'
  | '5+1'
  | '6 a více'
  | 'atypický';
export const REAL_ESTATE_BYTY_TYP_ARRAY: Array<RealEstateSubTypeByty> = [
  'pokoj',
  '1+kk',
  '1+1',
  '2+kk',
  '2+1',
  '3+kk',
  '3+1',
  '4+kk',
  '4+1',
  '5+kk',
  '5+1',
  '6 a více',
  'atypický',
];

export const REAL_ESTATE_BYTY_NECO_NAVIC_ARRAY = [
  'balkon',
  'terasa',
  'parkování',
  'výtah',
  'lodžie',
  'sklep',
  'garáž',
  'bezbariérový',
  'zahrada',
];
export type RealEstateMaterial = 'panel' | 'cihla' | 'ostatní';
export const REAL_ESTATE_STAVBA_ARRAY: Array<RealEstateMaterial> = ['panel', 'cihla', 'ostatní'];
export type RealEstateOwnership = 'osobní' | 'družstevní' | 'státní/obecní';
export const REAL_ESTATE_VLATNICTVI_ARRAY: Array<RealEstateOwnership> = ['osobní', 'družstevní', 'státní/obecní'];
const REAL_ESTATE_VYBAVENI_ARRAY = ['ano', 'ne'];

export const REAL_ESTATE_FILTER_BYTY_MAP: RealEstateFilterMap = {
  [REAL_ESTATE_FILTER_BYTY.TYP]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_BYTY_TYP_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.POD_TYP,
  },
  [REAL_ESTATE_FILTER_BYTY.STAV_OBJEKTU]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_STAV_OBJEKTU_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.STAVBA,
  },
  [REAL_ESTATE_FILTER_BYTY.VYBER_LOKALITY]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_FILTER_COUNTY_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.VYBER_LOKALITY,
  }, //pak budou další lokality
  [REAL_ESTATE_FILTER_BYTY.CENA]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.RANGE,
    array: ['od', 'do'],
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.CENA,
  },

  [REAL_ESTATE_FILTER_BYTY.NECO_NAVIC]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_BYTY_NECO_NAVIC_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.NECO_NAVIC,
  },
  [REAL_ESTATE_FILTER_BYTY.STAVBA]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_STAVBA_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.STAVBA,
  },
  [REAL_ESTATE_FILTER_BYTY.ENERGETICKA_TRIDA]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_ENERGETICKA_TRIDA_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.ENERGETICKA_TRIDA,
  },
  [REAL_ESTATE_FILTER_BYTY.VLATNICTVI]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_VLATNICTVI_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.VLATNICTVI,
  },
  [REAL_ESTATE_FILTER_BYTY.VYBAVENI]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_VYBAVENI_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.VYBAVENI,
  },
  [REAL_ESTATE_FILTER_BYTY.PATRO]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.RANGE,
    array: ['od', 'do'],
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.PATRO,
  },
  [REAL_ESTATE_FILTER_BYTY.PLOCHA]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.RANGE,
    array: ['od', 'do'],
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.PLOCHA,
  },
  [REAL_ESTATE_FILTER_BYTY.STARI]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.DROPDOWN,
    array: REAL_ESTATE_STARI_ARRAY,
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.STARI,
  },
};
