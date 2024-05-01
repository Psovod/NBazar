import { CommonModule } from '@angular/common';
import { Component, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapAdvancedMarker } from '@angular/google-maps';
import { Subject } from 'rxjs';
import { REAL_ESTATE_TYPE } from '../../constants';
import { MapsService } from './services/maps.service';
import { MarkerElementOptions, RealityMarker } from './types';
import { RealityLocationPipe } from '../../../search/search-result/pipes/reality-location.pipe';
import { Reality } from '../../reality-list/types';
import { ImagePathPipe } from '../../pipes/image-path.pipe';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss',
})
export class MapsComponent {
  @ViewChildren('advancedMarker') advancedMarkers!: QueryList<MapAdvancedMarker>;
  @ViewChild(GoogleMap, { static: false }) googleMap!: GoogleMap;
  private maps = inject(MapsService);
  center: google.maps.LatLngLiteral = { lat: 50.0755, lng: 14.4378 };
  zoom = 14;
  mapId = '12ed74020bbac09f';
  markers$: Subject<Array<RealityMarker>> = new Subject<Array<RealityMarker>>();
  ngOnInit(): void {
    this.init();
  }

  public selectReality(id: string) {
    this.advancedMarkers.forEach((marker) => {
      marker.advancedMarker.querySelector('.property')?.classList.remove('selected');
      marker.zIndex = 0;
      if (marker.advancedMarker.title === id) {
        this.maps.select(this.maps.list.find((reality) => reality.uuid === id) || null);
        marker.zIndex = 1;
        marker.advancedMarker.querySelector('.property')?.classList.add('selected');
        this.googleMap.panTo(marker.advancedMarker.position as google.maps.LatLngLiteral);
        this.googleMap.zoom = 16;
      }
    });
  }
  async init() {
    await google.maps.importLibrary('marker');
    let markers: Array<RealityMarker> = [];
    if (!this.maps.list) {
      return;
    }
    for (const reality of this.maps.list) {
      const AdvancedMarkerElement: MarkerElementOptions = {
        content: this.buildContent(reality),
        options: {
          gmpDraggable: false,
        },
        position: reality.location.coordinates,
        title: reality.uuid,
      };

      markers.push({
        marker: AdvancedMarkerElement,
        reality,
      });
    }
    this.markers$.next(markers);
  }
  public markerInitialized(marker: MapAdvancedMarker, id: string) {
    if (this.maps.id === id) {
      marker.zIndex = 1;
      marker.advancedMarker.querySelector('.property')?.classList.add('selected');
      this.googleMap.panTo(marker.advancedMarker.position as google.maps.LatLngLiteral);
      this.googleMap.zoom = 16;
    }
    marker.advancedMarker.addEventListener('mouseenter', () => {
      marker.advancedMarker.querySelector('.property')?.classList.add('highlight');
    });
    marker.advancedMarker.addEventListener('mouseleave', () => {
      marker.advancedMarker.querySelector('.property')?.classList.remove('highlight');
    });
  }
  private buildContent(reality: Reality) {
    const content = document.createElement('div');
    content.classList.add('property');
    content.innerHTML = `
        <div class="icon">
            <i aria-hidden="true"
              class="iconka fa fa-icon ${this.getIcon(reality.type)} type-${this.removeDiacritics(reality.type)}"></i>
            <span class="fa-sr-only">${reality.type}</span>
          <div class="image">
            <img
              src="${ImagePathPipe.prototype.transform(reality.images?.[0]) || 'https://via.placeholder.com/150'}" 
              alt="" />
          </div>
        </div>
        <div class="details">
          <div class="price">${reality.price}</div>
          <div class="price">${RealityLocationPipe.prototype.transform(reality.location)}</div>
        </div>`;

    return content;
  }
  private getIcon(type: REAL_ESTATE_TYPE) {
    switch (type) {
      case REAL_ESTATE_TYPE.BYTY:
        return 'fa-couch';
      case REAL_ESTATE_TYPE.DOMY:
        return 'fa-home';
      case REAL_ESTATE_TYPE.KOMERCNI:
        return 'fa-building';
      case REAL_ESTATE_TYPE.POZEMKY:
        return 'fa-location-dot';
      case REAL_ESTATE_TYPE.OSTATNI:
        return 'fa-box-open';
    }
  }
  private removeDiacritics(value: string): string {
    const diacritics: { [index: string]: string } = {
      á: 'a',
      č: 'c',
      ď: 'd',
      é: 'e',
      ě: 'e',
      í: 'i',
      ň: 'n',
      ó: 'o',
      ř: 'r',
      š: 's',
      ť: 't',
      ú: 'u',
      ů: 'u',
      ý: 'y',
      ž: 'z',
    };

    return value
      .split('')
      .map((char) => diacritics[char] || char)
      .join('');
  }
}
