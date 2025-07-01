import { inject, signal, computed, Injectable } from '@angular/core';
import { CountryService } from '../../../core/services/country.service';
import { Country } from '../../../core/models/countryModel';

@Injectable({
  providedIn: 'root',
})
export class CountryStore {
  private countryService = inject(CountryService);

  private nameFilter = signal('');
  private regionFilter = signal('');
  private selectedCountry = signal<Country | null>(null);
  private loading = signal(false);

  private countriesSignal = this.countryService.countriesSignal;

  readonly filteredCountries = computed(() => {
    const countries = this.countriesSignal();
    const name = this.nameFilter().toLowerCase();
    const region = this.regionFilter().toLowerCase();

    return countries.filter((country) => {
      const matchesName = country.name.common.toLowerCase().includes(name);
      const matchesRegion = region
        ? country.region.toLowerCase() === region
        : true;
      return matchesName && matchesRegion;
    });
  });

  readonly isLoading = computed(() => this.loading());

  async loadCountries(): Promise<void> {
    this.loading.set(true);
    const start = Date.now();

    await this.countryService.loadAllCountries();

    const elapsed = Date.now() - start;
    const remaining = 3000 - elapsed;

    if (remaining > 0) {
      await new Promise((res) => setTimeout(res, remaining));
    }

    this.loading.set(false);
  }

  setNameFilter(value: string): void {
    this.nameFilter.set(value);
  }

  setRegionFilter(value: string): void {
    this.regionFilter.set(value);
  }

  selectCountry(country: Country): void {
    this.selectedCountry.set(country);
  }

  getSelectedCountry(): Country | null {
    return this.selectedCountry();
  }

  searchByRegion(region: string): void {
    this.loading.set(true);
    const start = Date.now();

    this.countryService.searchByRegion(region).subscribe({
      next: async () => {
        const elapsed = Date.now() - start;
        const remaining = 3000 - elapsed;

        if (remaining > 0) {
          await new Promise((res) => setTimeout(res, remaining));
        }

        this.loading.set(false);
      },
      error: async () => {
        const elapsed = Date.now() - start;
        const remaining = 2000 - elapsed;

        if (remaining > 0) {
          await new Promise((res) => setTimeout(res, remaining));
        }

        this.loading.set(false);
      },
    });
  }
}
