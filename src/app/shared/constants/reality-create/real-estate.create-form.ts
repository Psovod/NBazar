import { REAL_ESTATE_TYPE } from '..';
import {
  RealityCreateInputType,
  RealityCreateOptions,
  RealityCreateOptionsSteps,
} from '../../../reality/reality-create/types';

import {
  REAL_ESTATE_BYTY_NECO_NAVIC_ARRAY,
  REAL_ESTATE_BYTY_TYP_ARRAY,
  REAL_ESTATE_ENERGETICKA_TRIDA_ARRAY,
  REAL_ESTATE_FILTER_DB_KEY_ARRAY,
  REAL_ESTATE_STAVBA_ARRAY,
  REAL_ESTATE_STAV_OBJEKTU_ARRAY,
  REAL_ESTATE_VLATNICTVI_ARRAY,
} from '../real-estate.byty';
import { REAL_ESTATE_DOMY_TYP_ARRAY, REAL_ESTATE_DOMY_VELIKOST_ARRAY } from '../real-estate.domy';
import { REAL_ESTATE_KOMERCNI_TYP_ARRAY } from '../real-estate.komercni';
import { REAL_ESTATE_OSTATNI_TYP_ARRAY } from '../real-estate.ostatni';
import { REAL_ESTATE_POZEMKY_TYP_ARRAY } from '../real-estate.pozemky';

export const selectTypeArray = (type: REAL_ESTATE_TYPE): RealityCreateOptions => {
  switch (type) {
    case REAL_ESTATE_TYPE.BYTY:
      realityCreateSubType.options = REAL_ESTATE_BYTY_TYP_ARRAY.map((key, index) => ({
        name: key,
        value: index + 1,
      }));
      break;
    case REAL_ESTATE_TYPE.DOMY:
      realityCreateSubType.options = REAL_ESTATE_DOMY_TYP_ARRAY.map((key, index) => ({
        name: key,
        value: index + REAL_ESTATE_BYTY_TYP_ARRAY.length + 1,
      }));
      break;
    case REAL_ESTATE_TYPE.POZEMKY:
      realityCreateSubType.options = REAL_ESTATE_POZEMKY_TYP_ARRAY.map((key, index) => ({
        name: key,
        value: index + REAL_ESTATE_DOMY_TYP_ARRAY.length + 1,
      }));
      break;
    case REAL_ESTATE_TYPE.KOMERCNI:
      realityCreateSubType.options = REAL_ESTATE_KOMERCNI_TYP_ARRAY.map((key, index) => ({
        name: key,
        value: index + REAL_ESTATE_POZEMKY_TYP_ARRAY.length + 1,
      }));
      break;
    case REAL_ESTATE_TYPE.OSTATNI:
      realityCreateSubType.options = REAL_ESTATE_OSTATNI_TYP_ARRAY.map((key, index) => ({
        name: key,
        value: index + REAL_ESTATE_KOMERCNI_TYP_ARRAY.length + 1,
      }));
      break;
    default:
      return realityCreateSubType;
  }
  return realityCreateSubType;
};

export const realityCreateType: RealityCreateOptions = {
  name: 'typ',
  dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.TYP_TRANSAKCE,
  class: 'col-auto',
  value: null,
  inputType: RealityCreateInputType.SELECT,
  options: [
    {
      name: 'Pronájem',
      value: 0,
    },
    {
      name: 'Prodej',
      value: 1,
    },
  ],
};
export const realityCreateCategory: RealityCreateOptions = {
  name: 'kategorie',
  dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.TYP,
  value: null,
  class: 'col-auto',
  inputType: RealityCreateInputType.SELECT,
  options: Object.values(REAL_ESTATE_TYPE).map((key, index) => {
    return {
      name: key,
      value: index + 1,
    };
  }),
};
export const realityCreateSubType: RealityCreateOptions = {
  name: 'podkategorie',
  dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.POD_TYP,
  class: 'col-auto',
  value: null,
  inputType: RealityCreateInputType.SELECT,
  options: [],
};
export const realityCreateSizeType: RealityCreateOptions = {
  name: 'Počet Pokojů',
  dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.VELIKOST,
  class: 'col-auto',
  value: null,
  inputType: RealityCreateInputType.SELECT,
  options: REAL_ESTATE_DOMY_VELIKOST_ARRAY.map((value, index) => {
    return {
      name: value,
      value: index + 1,
    };
  }),
};

export const realityCreateOptions: Array<RealityCreateOptions> = [
  {
    name: 'popis',
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.POPIS,
    class: 'col-span-2',
    value: null,
    inputType: RealityCreateInputType.TEXTAREA,
  },
  {
    name: 'adresa',
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.VYBER_LOKALITY,
    class: 'col-span-2',
    value: null,
    inputType: RealityCreateInputType.MAPS,
  },
  {
    name: 'cena',
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.CENA,
    class: 'col-span-2',
    value: null,
    inputType: RealityCreateInputType.NUMBER,
  },
  {
    class: 'col-span-2',
    name: 'stavba',
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.STAVBA,
    value: null,
    inputType: RealityCreateInputType.SELECT,
    options: REAL_ESTATE_STAVBA_ARRAY.map((value, index) => {
      return {
        name: value,
        value: index + 1,
      };
    }),
  },
  {
    class: 'col-span-2',
    name: 'Vlastnictví',
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.VLATNICTVI,
    value: null,
    inputType: RealityCreateInputType.SELECT,
    options: REAL_ESTATE_VLATNICTVI_ARRAY.map((value, index) => {
      return {
        name: value,
        value: index + 1,
      };
    }),
  },
  {
    class: 'col-span-2',
    name: 'Kondice',
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.STAV_OBJEKTU,
    value: null,
    inputType: RealityCreateInputType.SELECT,
    options: REAL_ESTATE_STAV_OBJEKTU_ARRAY.map((value, index) => {
      return {
        name: value,
        value: index + 1,
      };
    }),
  },
  {
    class: 'col-span-2',
    name: 'umístění podlaží',
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.PATRO,
    value: null,
    inputType: RealityCreateInputType.NUMBER,
  },
  {
    class: 'col-span-2',
    name: 'plocha',
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.PLOCHA,
    description: 'm²',
    value: null,
    inputType: RealityCreateInputType.NUMBER,
  },
  {
    class: 'col-span-2',
    name: 'něco navíc',
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.NECO_NAVIC,
    value: null,
    inputType: RealityCreateInputType.CHECKBOX,
    options: REAL_ESTATE_BYTY_NECO_NAVIC_ARRAY.map((value, index) => {
      return {
        name: value,
        value: index + 1,
      };
    }),
  },
  {
    class: 'col-span-2',
    name: 'vybavení',
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.VYBAVENI,
    value: null,
    inputType: RealityCreateInputType.SELECT,
    options: [
      {
        name: 'ne',
        value: 1,
      },
      {
        name: 'ano',
        value: 0,
      },
    ],
  },
  {
    class: 'col-span-2',
    name: 'energetická třída',
    dbKey: REAL_ESTATE_FILTER_DB_KEY_ARRAY.ENERGETICKA_TRIDA,
    value: null,
    inputType: RealityCreateInputType.SELECT,
    options: REAL_ESTATE_ENERGETICKA_TRIDA_ARRAY.map((value, index) => {
      return {
        name: value,
        value: index + 1,
      };
    }),
  },
];

export const realityCreateOptionsSteps: Array<RealityCreateOptionsSteps> = [
  {
    name: 'Typ & Kategorie',
    layout: 'grid grid-cols-2 gap-4',
    field: [
      realityCreateType,
      realityCreateCategory,
      realityCreateOptions.find((field) => field.dbKey === 'info') as RealityCreateOptions,
      realityCreateOptions.find((field) => field.dbKey === 'location') as RealityCreateOptions,
      realityCreateOptions.find((field) => field.dbKey === 'ownership_type') as RealityCreateOptions,
      realityCreateOptions.find((field) => field.dbKey === 'price') as RealityCreateOptions,
    ],
    valid: false,
  },
  {
    name: 'Detail',
    field: [
      realityCreateOptions.find((field) => field.dbKey === 'building_material') as RealityCreateOptions,
      realityCreateOptions.find((field) => field.dbKey === 'condition') as RealityCreateOptions,
      realityCreateOptions.find((field) => field.dbKey === 'floor') as RealityCreateOptions,
      realityCreateOptions.find((field) => field.dbKey === 'area') as RealityCreateOptions,
      realityCreateOptions.find((field) => field.dbKey === 'additional_equipment') as RealityCreateOptions,
      realityCreateOptions.find((field) => field.dbKey === 'furniture') as RealityCreateOptions,
      realityCreateOptions.find((field) => field.dbKey === 'energy_consumption') as RealityCreateOptions,
    ],
    layout: 'grid grid-cols-2 gap-4',
    valid: false,
  },
  {
    name: 'Fotografie',
    field: [
      {
        name: 'fotografie',
        dbKey: 'images',
        class: 'col-span-2',
        value: null,
        inputType: RealityCreateInputType.FILES,
      },
    ],
    layout: 'grid grid-cols-2 gap-4',
    valid: false,
  },
];
