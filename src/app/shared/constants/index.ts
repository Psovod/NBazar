import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faBoxOpen,
  faBuilding,
  faCouch,
  faGlobe,
  faHome,
  faLandmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  REAL_ESTATE_FILTER_BYTY,
  REAL_ESTATE_FILTER_BYTY_MAP,
  REAL_ESTATE_FILTER_INPUT_TYPE,
} from './realestate.byty';

export interface RealEstateFilter {
  name: string;
  value: number;
}

export enum REAL_ESTATE_TYPE {
  BYTY = 'byty',
  DOMY = 'domy',
  PROJEKTY = 'projekty',
  POZEMKY = 'pozemky',
  KOMERCNI = 'komerční',
  OSTATNI = 'ostatní',
}

export enum REAL_ESTATE_FILTER_DOMY {
  VELIKOST = 'velikost',
  TYP = 'typ',
  STAV_OBJEKTU = 'stav objektu',
  VYBER_LOKALITY = 'výběr lokality',
  CENA = 'cena',
  ENERGETICKA_TRIDA = 'energetická třida',
  PLOCHA = 'plocha',
  STARI = 'staří',
}
export enum REAL_ESTATE_FILTER_PROJEKTY {
  PROJEKT = 'projekt',
  KATEGORIE = 'kategorie',
}
export enum REAL_ESTATE_FILTER_POZEMKY {
  TYP = 'typ',
  VYBER_LOKALITY = 'výběr lokality',
  CENA = 'cena',
  PLOCHA = 'plocha',
  STARI = 'staří',
}
export enum REAL_ESTATE_FILTER_KOMERCNI {
  TYP = 'typ',
  STAV_OBJEKTU = 'stav objektu',
  VYBER_LOKALITY = 'výběr lokality',
  CENA = 'cena',
  PLOCHA = 'plocha',
  STARI = 'staří',
}
export enum REAL_ESTATE_FILTER_OSTATNI {
  TYP = 'typ',
  STAV_OBJEKTU = 'stav objektu',
  VYBER_LOKALITY = 'výběr lokality',
  CENA = 'cena',
  STARI = 'staří',
}

export const REAL_ESTATE_FILTER_DOMY_MAP = {
  [REAL_ESTATE_FILTER_BYTY.TYP]: [
    'rodinný',
    'řadový',
    'dvojdomek',
    'vila',
    'chalupa',
    'chalupa se zahradou',
    'samostatný',
    'patrový',
    'přízemní',
    'vícepodlažní',
    'vícegenerační',
  ],
  [REAL_ESTATE_FILTER_BYTY.STAV_OBJEKTU]: [
    'novostavba',
    'dobrý',
    've velmi dobrém stavu',
    've výborném stavu',
    'po rekonstrukci',
    'před rekonstrukcí',
    've výstavbě',
    'developerský projekt',
    'projekt',
  ],
  [REAL_ESTATE_FILTER_BYTY.VYBER_LOKALITY]: ['Praha', 'Brno'],
};

export const REAL_ESTATE_FILTER_PROJEKTY_MAP = {
  [REAL_ESTATE_FILTER_BYTY.TYP]: ['rodinný', 'řadový'],
  [REAL_ESTATE_FILTER_BYTY.STAV_OBJEKTU]: ['novostavba', 'dobrý'],
  [REAL_ESTATE_FILTER_BYTY.VYBER_LOKALITY]: ['Praha', 'Brno'],
};
export const REAL_ESTATE_FILTER_POZEMKY_MAP = {
  [REAL_ESTATE_FILTER_BYTY.VYBER_LOKALITY]: ['Praha', 'Brno'],
};
export const REAL_ESTATE_FILTER_KOMERCNI_MAP = {
  [REAL_ESTATE_FILTER_BYTY.VYBER_LOKALITY]: ['Praha', 'Brno'],
};
export const REAL_ESTATE_FILTER_OSTATNI_MAP = {
  [REAL_ESTATE_FILTER_BYTY.VYBER_LOKALITY]: ['Praha', 'Brno'],
};

export const REAL_ESTATE_FILTER_MAP = {
  [REAL_ESTATE_TYPE.BYTY]: REAL_ESTATE_FILTER_BYTY_MAP,
  [REAL_ESTATE_TYPE.DOMY]: REAL_ESTATE_FILTER_DOMY_MAP,
  [REAL_ESTATE_TYPE.PROJEKTY]: REAL_ESTATE_FILTER_PROJEKTY_MAP,
  [REAL_ESTATE_TYPE.POZEMKY]: REAL_ESTATE_FILTER_POZEMKY_MAP,
  [REAL_ESTATE_TYPE.KOMERCNI]: REAL_ESTATE_FILTER_KOMERCNI_MAP,
  [REAL_ESTATE_TYPE.OSTATNI]: REAL_ESTATE_FILTER_OSTATNI_MAP,
};

export const REAL_ESTATE_OBJECT = Object.fromEntries(
  Object.entries(REAL_ESTATE_TYPE).map(([key, value]) => [
    value,
    {
      type: value,
      filters: Object.entries(REAL_ESTATE_FILTER_MAP[value]).map(
        ([name, values]) => ({
          name,
          values,
        })
      ),
    },
  ])
);

export interface RealityList {
  name: REAL_ESTATE_TYPE;
  icon: IconDefinition;
}
export interface RealityFilterTypeCheckbox {
  name: string;
  active: boolean;
  value?: number;
  options?: Array<string>;
  searchIndex: number;
}

export interface RealityFilterTypeList {
  type: string;
  hidden: boolean;
  inputType: REAL_ESTATE_FILTER_INPUT_TYPE;
  filters: Array<RealityFilterTypeCheckbox>;
}
export const REAL_ESTATE: Array<RealityList> = [
  {
    icon: faCouch,
    name: REAL_ESTATE_TYPE.BYTY,
  },
  {
    icon: faHome,
    name: REAL_ESTATE_TYPE.DOMY,
  },
  {
    icon: faGlobe,
    name: REAL_ESTATE_TYPE.PROJEKTY,
  },
  {
    icon: faLandmark,
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
