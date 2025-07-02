import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/countries/pages/home-countries/home-countries').then(
        (m) => m.HomeCountriesComponent
      ),
  },
  {
    path: 'details/:code',
    loadComponent: () =>
      import('./features/countries/pages/details-country/details-country').then(
        (m) => m.DetailsCountryComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
