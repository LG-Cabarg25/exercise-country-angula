import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryStore } from '../../state/countryStore';
import { TableCountriesComponent } from '../../components/table-countries/table-countries';
import { SpinnerLoadComponent } from '../../../../shared/components/spinnerLoad/spinnerLoad';

@Component({
  selector: 'app-home-countries',
  standalone: true,
  imports: [CommonModule, TableCountriesComponent, SpinnerLoadComponent],

  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="min-h-screen bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 text-yellow-400 flex flex-col items-center px-4 py-10 mb-12"
    >
      <br />
      <h1 class="text-3xl md:text-4xl font-bold mt-24 mb-8 text-center">
        Listado de países
      </h1>

      <div class="w-full max-w-7xl">
        @if (store.isLoading()) {
        <app-spinner-load />
        } @if (!store.isLoading()) {
        <app-table-countries [countries]="store.filteredCountries()" />
        }
      </div>
    </div>
  `,
})
export class HomeCountriesComponent {
  store = inject(CountryStore);

  constructor() {
    this.store.loadCountries();
  }
}
