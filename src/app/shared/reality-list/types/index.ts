import { User } from '../../auth/types';
import { REAL_ESTATE_TYPE } from '../../constants';
import {
  RealEstateCondition,
  RealEstateEnergyConsumption,
  RealEstateMaterial,
  RealEstateOwnership,
  RealEstateSubTypeByty,
} from '../../constants/real-estate.byty';
import { RealEstateSubTypeDomy } from '../../constants/real-estate.domy';
import { RealEstateSubTypeKomercni } from '../../constants/real-estate.komercni';
import { RealEstateSubTypeOstatni } from '../../constants/real-estate.ostatni';
import { RealEstateSubTypePozemky } from '../../constants/real-estate.pozemky';

export interface RealityListConfig {
  canDelete: boolean;
  canEdit: boolean;
  canShowReport?: boolean;
  canFavorite?: boolean;
}

export interface Reality {
  uuid: string;
  user_id: number;
  user: User;
  type: REAL_ESTATE_TYPE;
  sub_type:
    | RealEstateSubTypeByty
    | RealEstateSubTypeDomy
    | RealEstateSubTypeKomercni
    | RealEstateSubTypePozemky
    | RealEstateSubTypeOstatni;
  ownership_type: RealEstateOwnership;
  price: number;
  energy_consumption: RealEstateEnergyConsumption;
  additional_equipment: Array<string>;
  building_material: RealEstateMaterial;
  condition: RealEstateCondition;
  floor?: number;
  location: RealityLocation;
  info: string;
  images: Array<string>;
  reported_count: number;
  area: number;
  furniture: boolean;
  transaction_type: number;
}

export interface RealityLocation {
  id: string;
  address: string;
  county: number;
  short_name: string;
  zip_code: string;
  coordinates: google.maps.LatLngLiteral;
}
