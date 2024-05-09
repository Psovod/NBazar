export interface AdminFilterType {
  users: AdminFilterTypeList;
  reality: AdminFilterTypeList;
  active: AdminFilterTypeList;
}
export interface AdminFilterTypeList {
  name: string;
  active: boolean;
  info: string;
  _name: string;
}
