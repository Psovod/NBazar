import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeCs from '@angular/common/locales/cs';
import { Loader } from '@googlemaps/js-api-loader';
const loader = new Loader({
  apiKey: 'AIzaSyCptoU_l-wtStgmKoSlhQJ_qdLT4qopeMI',
  version: 'beta',
  libraries: ['places', 'maps', 'marker', 'geometry'],
  language: 'cs',
});

registerLocaleData(localeCs);
loader.load().then(async () => {});
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'cs-CZ' },
    CurrencyPipe,
    provideRouter(routes),
    // provideClientHydration(),
    provideHttpClient(),
  ],
};
