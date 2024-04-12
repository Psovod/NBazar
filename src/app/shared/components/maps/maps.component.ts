import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleMapsModule, MapAdvancedMarker } from '@angular/google-maps';
import { Custom } from '../../../search/search-result/search-result.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss',
})
export class MapsComponent {
  center: google.maps.LatLngLiteral = { lat: 37.5, lng: -122.2 };
  zoom = 8;
  mapId = '12ed74020bbac09f';
  markers$: Subject<Custom[]> = new Subject<Custom[]>();
  addMarker(event: google.maps.MapMouseEvent): void {}
  updatePosition(
    event: google.maps.MapMouseEvent,
    position: Custom,
    advancedMarker: MapAdvancedMarker
  ): void {}
  toggleHighlight(position: Custom): void {}
  ngOnInit(): void {
    this.init();
  }
  async init() {
    await google.maps.importLibrary('marker');
    let markers = [];
    for (const property of this.properties) {
      const AdvancedMarkerElement = {
        content: this.buildContent(property),
        options: {
          gmpDraggable: true,
        },
        position: property.position,
        title: property.description,
      };

      markers.push({ marker: AdvancedMarkerElement, property: property });
    }
    this.markers$.next(markers);
  }
  buildContent(property: any) {
    const content = document.createElement('div');
    content.classList.add('property');
    content.innerHTML = `
      <div class="icon">
          <i aria-hidden="true" class="fa fa-icon fa-${property.type}" title="${property.type}"></i>
          <span class="fa-sr-only">${property.type}</span>
      </div>
      <div class="details">
          <div class="price">${property.price}</div>
          <div class="address">${property.address}</div>
          <div class="features">
          <div>
              <i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>
              <span class="fa-sr-only">bedroom</span>
              <span>${property.bed}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-bath fa-lg bath" title="bathroom"></i>
              <span class="fa-sr-only">bathroom</span>
              <span>${property.bath}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"></i>
              <span class="fa-sr-only">size</span>
              <span>${property.size} ft<sup>2</sup></span>
          </div>
          </div>
      </div>
      `;
    return content;
  }
  properties = [
    {
      address: '215 Emily St, MountainView, CA',
      description: 'Single family house with modern design',
      price: 3000000,
      type: 'home',
      bed: 5,
      bath: 4.5,
      size: 300,
      position: {
        lat: 37.50024109655184,
        lng: -122.28528451834352,
      },
    },
    {
      address: '108 Squirrel Ln &#128063;, Menlo Park, CA',
      description: 'Townhouse with friendly neighbors',
      price: 3000000,
      type: 'building',
      bed: 4,
      bath: 3,
      size: 200,
      position: {
        lat: 37.44440882321596,
        lng: -122.2160620727,
      },
    },
    {
      address: '100 Chris St, Portola Valley, CA',
      description: 'Spacious warehouse great for small business',
      price: 3000000,
      type: 'warehouse',
      bed: 4,
      bath: 4,
      size: 800,
      position: {
        lat: 37.39561833718522,
        lng: -122.21855116258479,
      },
    },
    {
      address: '98 Aleh Ave, Palo Alto, CA',
      description: 'A lovely store on busy road',
      price: 3000000,
      type: 'store-alt',
      bed: 2,
      bath: 1,
      size: 210,
      position: {
        lat: 37.423928529779644,
        lng: -122.1087629822001,
      },
    },
    {
      address: '2117 Su St, MountainView, CA',
      description: 'Single family house near golf club',
      price: 3000000,
      type: 'home',
      bed: 4,
      bath: 3,
      size: 200,
      position: {
        lat: 37.40578635332598,
        lng: -122.15043378466069,
      },
    },
    {
      address: '197 Alicia Dr, Santa Clara, CA',
      description: 'Multifloor large warehouse',
      price: 3000000,
      type: 'warehouse',
      bed: 5,
      bath: 4,
      size: 700,
      position: {
        lat: 37.36399747905774,
        lng: -122.10465384268522,
      },
    },
    {
      address: '700 Jose Ave, Sunnyvale, CA',
      description: '3 storey townhouse with 2 car garage',
      price: 3000000,
      type: 'building',
      bed: 4,
      bath: 4,
      size: 600,
      position: {
        lat: 37.38343706184458,
        lng: -122.02340436985183,
      },
    },
    {
      address: '868 Will Ct, Cupertino, CA',
      description: 'Single family house in great school zone',
      price: 3000000,
      type: 'home',
      bed: 3,
      bath: 2,
      size: 100,
      position: {
        lat: 37.34576403052,
        lng: -122.04455090047453,
      },
    },
    {
      address: '655 Haylee St, Santa Clara, CA',
      description: '2 storey store with large storage room',
      price: 3000000,
      type: 'store-alt',
      bed: 3,
      bath: 2,
      size: 450,
      position: {
        lat: 37.362863347890716,
        lng: -121.97802139023555,
      },
    },
    {
      address: '2019 Natasha Dr, San Jose, CA',
      description: 'Single family house',
      price: 3000000,
      type: 'home',
      bed: 4,
      bath: 3.5,
      size: 500,
      position: {
        lat: 37.41391636421949,
        lng: -121.94592071575907,
      },
    },
  ];
}
