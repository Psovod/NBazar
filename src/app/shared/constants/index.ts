import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faBoxOpen,
  faBuilding,
  faCouch,
  faGlobe,
  faHome,
  faLandmark,
} from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
export enum REAL_ESTATE_TYPE {
  BYTY = 'byty',
  DOMY = 'domy',
  PROJEKTY = 'projekty',
  POZEMKY = 'pozemky',
  KOMERCNI = 'komercni',
  OSTATNI = 'ostatni',
}
export enum REAL_ESTATE_FILTER_BYTY {
  TYP = 'typ',
  STAV_OBJEKTU = 'stav objektu',
  VYBER_LOKALITY = 'vyber lokality',
  CENA = 'cena',
  ENERGETICKA_TRIDA = 'energeticka trida',
  VLASTNICTVI = 'vlastnictví',
  VYBAVENI = 'vybavení',
  PATRO = 'patro',
  PLOCHA = 'plocha',
  STARI = 'stari',
}

export enum REAL_ESTATE_FILTER_DOMY {
  VELIKOST = 'velikost',
  TYP = 'typ',
  STAV_OBJEKTU = 'stav objektu',
  VYBER_LOKALITY = 'vyber lokality',
  CENA = 'cena',
  ENERGETICKA_TRIDA = 'energeticka trida',
  PLOCHA = 'plocha',
  STARI = 'stari',
}
export enum REAL_ESTATE_FILTER_PROJEKTY {
  PROJEKT = 'projekt',
  KATEGORIE = 'kategorie',
}
export enum REAL_ESTATE_FILTER_POZEMKY {
  TYP = 'typ',
  VYBER_LOKALITY = 'vyber lokality',
  CENA = 'cena',
  PLOCHA = 'plocha',
  STARI = 'stari',
}
export enum REAL_ESTATE_FILTER_KOMERCNI {
  TYP = 'typ',
  STAV_OBJEKTU = 'stav objektu',
  VYBER_LOKALITY = 'vyber lokality',
  CENA = 'cena',
  PLOCHA = 'plocha',
  STARI = 'stari',
}
export enum REAL_ESTATE_FILTER_OSTATNI {
  TYP = 'typ',
  STAV_OBJEKTU = 'stav objektu',
  VYBER_LOKALITY = 'vyber lokality',
  CENA = 'cena',
  STARI = 'stari',
}
export const REAL_ESTATE_FILTER_BYTY_MAP = {
  [REAL_ESTATE_FILTER_BYTY.TYP]: [
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
  [REAL_ESTATE_FILTER_BYTY.CENA]: [
    '1 000 000 - 2 000 000',
    '2 000 000 - 3 000 000',
  ],
};
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
}
export interface RealityFilterTypeList {
  type: string;
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
