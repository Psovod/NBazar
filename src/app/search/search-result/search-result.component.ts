import { Component, ViewChild } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GoogleMapsModule,
  MapAdvancedMarker,
  MapInfoWindow,
} from '@angular/google-maps';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
import { MapsComponent } from '../../shared/components/maps/maps.component';
export interface Custom {
  marker: {
    options: google.maps.marker.AdvancedMarkerElementOptions;
    content: any;
    position: google.maps.LatLngLiteral;
    title: string;
  };
  property: any;
}
@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule,
    MapInfoWindow,
    NgOptimizedImage,
    MapsComponent,
  ],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent {
  customContent!: google.maps.marker.PinElement;
  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(async (params) => {
      // this.searchService.search(params['query'], params['filters']);
    });
  }
  @ViewChild(MapAdvancedMarker) advancedMarker!: MapAdvancedMarker;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  markers$: Subject<Custom[]> = new Subject<Custom[]>();
  searchResults$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  center: google.maps.LatLngLiteral = { lat: 37.5, lng: -122.2 };
  mapId: string = '12ed74020bbac09f';
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
    this.searchResults$.next([...markers, ...markers]);
  }
  viewProperty(id: string) {
    this.router.navigate(['/reality', id || 'test']);
  }
  zoom = 10;
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
  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      // this.markerPositions.push(
      // );
    }
  }
  async ngAfterViewInit(): Promise<void> {
    console.log('route', this.route.snapshot.params);
    await this.init();
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

  create() {
    const parser = new DOMParser();
    const pinSvgString =
      '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none"><rect width="56" height="56" rx="28" fill="#7837FF"></rect><path d="M46.0675 22.1319L44.0601 22.7843" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11.9402 33.2201L9.93262 33.8723" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M27.9999 47.0046V44.8933" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M27.9999 9V11.1113" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M39.1583 43.3597L37.9186 41.6532" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.8419 12.6442L18.0816 14.3506" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.93262 22.1319L11.9402 22.7843" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M46.0676 33.8724L44.0601 33.2201" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M39.1583 12.6442L37.9186 14.3506" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.8419 43.3597L18.0816 41.6532" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M28 39L26.8725 37.9904C24.9292 36.226 23.325 34.7026 22.06 33.4202C20.795 32.1378 19.7867 30.9918 19.035 29.9823C18.2833 28.9727 17.7562 28.0587 17.4537 27.2401C17.1512 26.4216 17 25.5939 17 24.7572C17 23.1201 17.5546 21.7513 18.6638 20.6508C19.7729 19.5502 21.1433 19 22.775 19C23.82 19 24.7871 19.2456 25.6762 19.7367C26.5654 20.2278 27.34 20.9372 28 21.8649C28.77 20.8827 29.5858 20.1596 30.4475 19.6958C31.3092 19.2319 32.235 19 33.225 19C34.8567 19 36.2271 19.5502 37.3362 20.6508C38.4454 21.7513 39 23.1201 39 24.7572C39 25.5939 38.8488 26.4216 38.5463 27.2401C38.2438 28.0587 37.7167 28.9727 36.965 29.9823C36.2133 30.9918 35.205 32.1378 33.94 33.4202C32.675 34.7026 31.0708 36.226 29.1275 37.9904L28 39Z" fill="#FF7878"></path></svg>';

    return parser.parseFromString(pinSvgString, 'image/svg+xml')
      .documentElement;
  }
  toggleHighlight(markerView: any) {
    this.searchResults$.next([...this.searchResults$.value, markerView]);
    console.log('Marker clicked', markerView);
    if (markerView.content.classList.contains('highlight')) {
      markerView.content.classList.remove('highlight');
      markerView.zIndex = null;
    } else {
      markerView.content.classList.add('highlight');
      markerView.zIndex = 1;
    }
  }
  markerClustererImagePath =
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
  updatePosition(
    event: google.maps.MapMouseEvent,
    position: Custom,
    advancedMarker: MapAdvancedMarker
  ) {
    console.log('Marker position updated', event, position);
    event.latLng?.lat();
    position.marker.position = {
      lat: event.latLng?.lat() as number,
      lng: event.latLng?.lng() as number,
    };
    const pos = advancedMarker.advancedMarker.position as google.maps.LatLng;
    this.infoWindow.close();
    this.infoWindow.infoWindow?.setContent(
      `Pin dropped at: ${pos.lat}, ${pos.lng}`
    );
    this.infoWindow.infoWindow?.open(
      advancedMarker.advancedMarker.map,
      advancedMarker.advancedMarker
    );

    // Handle marker position update logic here
  }
  openInfoWindow(marker: MapAdvancedMarker) {
    console.log('Marker info window opened', event);
    console.log('Marker info window opened', marker);
    // Handle marker info window logic here
    // this.infoWindow.open(marker);
  }
}
