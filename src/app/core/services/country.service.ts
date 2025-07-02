import { HttpClient } from '@angular/common/http';
import {
  DestroyRef,
  Injectable,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Country, CountryState } from '../models';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/';
  private countries = signal<Country[]>([]);
  private isLoading = signal<boolean>(false);

  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  readonly countriesState = computed<CountryState>(() => ({
    isLoadingCountries: this.isLoading(),
    countries: this.countries(),
  }));

  get countriesSignal() {
    return this.countries;
  }

  get isLoadingSignal() {
    return this.isLoading;
  }

  loadAllCountries(): void {
    this.isLoading.set(true);
    this.http
      .get<Country[]>(`${this.apiUrl}region/america`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.countries.set(data);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error al cargar todos los países', error);
          this.countries.set([]);
          this.isLoading.set(false);
        },
      });
  }

  // Búsqueda por país
  searchCountryByName(query: string): void {
    this.isLoading.set(true);
    this.http
      .get<Country[]>(`${this.apiUrl}name/${query}`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.countries.set(data);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error al buscar país por nombre', error);
          this.countries.set([]);
          this.isLoading.set(false);
        },
      });
  }

  // Búsqueda por capital
  searchByCapital(query: string): void {
    this.isLoading.set(true);
    this.http
      .get<Country[]>(`${this.apiUrl}capital/${query}`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.countries.set(data);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error al buscar por capital', error);
          this.countries.set([]);
          this.isLoading.set(false);
        },
      });
  }

  // Búsqueda por región
  searchByRegion(region: string) {
    return this.http.get<Country[]>(`${this.apiUrl}region/${region}`).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((data) => this.countries.set(data)),
      catchError((error) => {
        console.error('Error al buscar por región', error);
        this.countries.set([]);
        return of([]);
      })
    );
  }
  getCountryByCode(code: string) {
    return this.http.get<Country[]>(`${this.apiUrl}alpha/${code}`).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((res) => {
        if (!res || res.length === 0) {
          console.warn(`No se encontró país con código ${code}`);
        }
      }),
      catchError((error) => {
        console.error('Error al obtener país por código', error);
        return of([]);
      })
    );
  }
}
