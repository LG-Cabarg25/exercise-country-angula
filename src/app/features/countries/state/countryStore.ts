import { inject, signal, computed, Injectable, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CountryService } from '../../../core/services/country.service';
import { Country } from '../../../core/models/countryModel';
import { of } from 'rxjs';

const STORAGE_KEY = 'countryAppState';

@Injectable({
  providedIn: 'root',
})
export class CountryStore {
  private countryService = inject(CountryService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private nameFilter = signal('');
  private regionFilter = signal('');
  private selectedCountry = signal<Country | null>(null);
  private selectedCountryCode = signal<string | null>(null);
  private loading = signal(false);

  private countriesSignal = this.countryService.countriesSignal;

  constructor() {
    if (this.isBrowser) {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const state = JSON.parse(savedState);
        this.nameFilter.set(state.nameFilter || '');
        this.regionFilter.set(state.regionFilter || '');
        this.selectedCountryCode.set(state.selectedCountryCode || null);
      }

      effect(() => {
        const state = {
          nameFilter: this.nameFilter(),
          regionFilter: this.regionFilter(),
          selectedCountryCode: this.selectedCountryCode()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      });
    }

    effect(() => {
      const code = this.selectedCountryCode();
      if (!code) {
        this.selectedCountry.set(null);
        return;
      }

      this.countryService.getCountryByCode(code).subscribe((res) => {
        this.selectedCountry.set(res[0] || null);
      });
    });
  }

  readonly filteredCountries = computed(() => {
    const countries = this.countriesSignal();
    const name = this.nameFilter().toLowerCase();
    const region = this.regionFilter().toLowerCase();

    return countries?.filter((country: Country) => {
      const matchesName = country?.name?.common?.toLowerCase().includes(name) ?? false;
      const matchesRegion = region
        ? country?.region?.toLowerCase() === region
        : true;
      return matchesName && matchesRegion;
    }) ?? [];
  });

  readonly isLoading = computed(() => this.loading());

  readonly selectedCountrySignal = computed(() => this.selectedCountry());

  async loadCountries(): Promise<void> {
    this.loading.set(true);
    const start = Date.now();
    await this.countryService.loadAllCountries();
    const elapsed = Date.now() - start;
    const remaining = 3000 - elapsed;
    if (remaining > 0) await new Promise((res) => setTimeout(res, remaining));
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

  setSelectedCountryCode(code: string): void {
    this.selectedCountryCode.set(code);
  }

  searchByRegion(region: string): void {
    this.loading.set(true);
    const start = Date.now();

    this.countryService.searchByRegion(region).subscribe({
      next: async () => {
        const elapsed = Date.now() - start;
        const remaining = 3000 - elapsed;
        if (remaining > 0)
          await new Promise((res) => setTimeout(res, remaining));
        this.loading.set(false);
      },
      error: async () => {
        const elapsed = Date.now() - start;
        const remaining = 2000 - elapsed;
        if (remaining > 0)
          await new Promise((res) => setTimeout(res, remaining));
        this.loading.set(false);
      },
    });
  }
}
