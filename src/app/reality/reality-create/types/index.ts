export interface RealityCreateConfig {
  uuid: string | null;
}

export enum RealityCreateInputType {
  SELECT = 'select',
  TEXTAREA = 'textarea',
  FILES = 'files',
  NUMBER = 'number',
  CHECKBOX = 'checkbox',
  MAPS = 'maps',
}
export interface RealityCreateOptions {
  name: string;
  dbKey: string;
  value: string | null | Array<string>;
  inputType: RealityCreateInputType;
  class: string;
  description?: string;
  options?: Array<RealityCreateFormValues>;
}

export interface RealityCreateOptionsSteps {
  name: string;
  layout: string;
  valid: boolean;
  field: Array<RealityCreateOptions>;
}
export interface RealityCreateFormValues {
  name: string;
  value: string | number | null | Array<string> | any;
}
