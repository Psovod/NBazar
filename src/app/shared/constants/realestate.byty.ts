import { RealEstateFilter } from '.';
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
const REAL_ESTATE_BYTY_TYP_ARRAY = [
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

const REAL_ESTATE_BYTY_STAV_OBJEKTU_ARRAY = [
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
const REAL_ESTATE_BYTY_NECO_NAVIC_ARRAY = [
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
const REAL_ESTATE_BYTY_STAVBA_ARRAY = ['panel', 'cihla', 'ostatní'];
const REAL_ESTATE_BYTY_ENERGETICKA_TRIDA_ARRAY = [
  'A - Mimořádně úsporná',
  'B - Velmi úsporná',
  'C - Úsporná',
  'D - Méně úsporná',
  'E - Nehospodárná',
  'F - Velmi nehospodárná',
  'G - Mimořádně nehospodárná',
];
const REAL_ESTATE_BYTY_VLATNICTVI_ARRAY = [
  'osobní',
  'družstevní',
  'státní/obecní',
];
const REAL_ESTATE_BYTY_VYBAVENI_ARRAY = ['ano', 'ne', 'částečně'];

console.log(REAL_ESTATE_FILTER_INPUT_TYPE);
export const REAL_ESTATE_FILTER_BYTY_MAP = {
  [REAL_ESTATE_FILTER_BYTY.TYP]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_BYTY_TYP_ARRAY,
  },
  [REAL_ESTATE_FILTER_BYTY.STAV_OBJEKTU]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_BYTY_STAV_OBJEKTU_ARRAY,
  },
  [REAL_ESTATE_FILTER_BYTY.VYBER_LOKALITY]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: ['Praha', 'Brno'],
  }, //pak budou další lokality
  [REAL_ESTATE_FILTER_BYTY.CENA]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.RANGE,
    array: ['od', 'do'],
  },

  [REAL_ESTATE_FILTER_BYTY.NECO_NAVIC]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_BYTY_NECO_NAVIC_ARRAY,
  },
  [REAL_ESTATE_FILTER_BYTY.STAVBA]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_BYTY_STAVBA_ARRAY,
  },
  [REAL_ESTATE_FILTER_BYTY.ENERGETICKA_TRIDA]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_BYTY_ENERGETICKA_TRIDA_ARRAY,
  },
  [REAL_ESTATE_FILTER_BYTY.VLATNICTVI]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_BYTY_VLATNICTVI_ARRAY,
  },
  [REAL_ESTATE_FILTER_BYTY.VYBAVENI]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.CHECKBOX,
    array: REAL_ESTATE_BYTY_VYBAVENI_ARRAY,
  },
  [REAL_ESTATE_FILTER_BYTY.PATRO]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.RANGE,
    array: ['od', 'do'],
  },
  [REAL_ESTATE_FILTER_BYTY.PLOCHA]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.RANGE,
    array: ['od', 'do'],
  },
  [REAL_ESTATE_FILTER_BYTY.STARI]: {
    type: REAL_ESTATE_FILTER_INPUT_TYPE.DROPDOWN,
    array: ['bez omezení', 'den', 'posledních 7 dní', 'posledních 30 dní'],
  },
};
