import { Reality } from '../../../reality-list/types';

export interface MarkerElementOptions {
  options: google.maps.marker.AdvancedMarkerElementOptions;
  content: any;
  position: google.maps.LatLngLiteral;
  title: string;
}
export interface RealityMarker {
  marker: MarkerElementOptions;
  reality: Reality;
}
