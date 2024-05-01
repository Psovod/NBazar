import { REAL_ESTATE_FILTER_INPUT_TYPE } from '../../shared/constants/real-estate.byty';
import { Reality } from '../../shared/reality-list/types';

export interface SearchActiveType {
  active: boolean;
  name: string;
}
export interface SearchPaginateRealityList {
  data: Array<Reality>;
  total: number;
  lastPage: number;
}
export interface RealityFilterTypeList {
  name: string;
  dbKey: string;
  hidden: boolean;
  inputType: REAL_ESTATE_FILTER_INPUT_TYPE;
  filters: Array<RealityFilterHTMLType>;
}
export interface RealityFilterHTMLType {
  name: string;
  active?: boolean;
  value?: number | null | Array<number>;
  options?: Array<RealityFilterHTMLTypeOptions>;
  searchIndex?: number;
}
export interface RealityFilterHTMLTypeOptions {
  name: string;
  value: number;
}
