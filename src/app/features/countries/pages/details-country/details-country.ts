import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../../../core/services/country.service';
import { Country } from '../../../../core/models';
import { toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap, map } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { SpinnerLoadComponent } from '../../../../shared/components/spinnerLoad/spinnerLoad';

@Component({
  selector: 'app-details-country',
  standalone: true,
  imports: [CommonModule, ButtonModule, SpinnerLoadComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="min-h-screen bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 text-yellow-400 flex flex-col items-center justify-between px-4 py-20 mb-12 relative"
    >
      <div class="absolute top-8 right-8 z-10">
        <p-button
          icon="pi pi-arrow-left"
          label="Regresar"
          (click)="goBack()"
          styleClass="p-button-lg p-button-info p-button-text shadow-lg"
        />
      </div>
      <div
        class="w-full max-w-6xl mx-auto relative rounded-3xl shadow-2xl p-12 flex flex-col  mt-0"
        style="background: none; box-shadow: none; margin-top: 2rem;"
      >
        @if (country()) {
        <div class="flex flex-col md:flex-row  gap-20 w-full">
          <div
            class="flex flex-col items-center text-center justify-center md:w-1/2"
          >
            <h2 class="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
              {{ country()!.name.common }}
            </h2>
            <img
              [src]="country()!.flags.svg"
              alt="Bandera"
              class="w-[32rem] h-auto rounded-2xl shadow-2xl border-8 border-white mb-10"
            />
            <span class="text-3xl text-indigo-200 font-semibold mb-2">{{
              country()!.name.official
            }}</span>
          </div>
          <div class="md:w-1/2 flex flex-col gap-8 text-2xl items-center">
            <div class="flex items-center gap-4">
              <span class="font-bold text-yellow-400">Subregión:</span>
              <span class="text-white">{{ country()!.subregion }}</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="font-bold text-yellow-400">Idiomas:</span>
              <span class="text-white">{{ getLanguages(country()!) }}</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="font-bold text-yellow-400">Moneda:</span>
              <span class="text-white">{{ getCurrencies(country()!) }}</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="font-bold text-yellow-400">Mapa:</span>
              <a
                [href]="country()!.maps.googleMaps"
                target="_blank"
                class="text-blue-400 underline hover:text-blue-300 transition text-2xl"
              >
                Ver en Google Maps
              </a>
            </div>
          </div>
        </div>
        } @else {
        <div class="flex justify-center items-center py-32">
          <app-spinner-load />
        </div>
        }
      </div>
    </div>
  `,
})
export class DetailsCountryComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private countryService = inject(CountryService);

  country = toSignal(
    this.route.paramMap.pipe(
      switchMap((params) => {
        const code = params.get('code');
        return code
          ? this.countryService
              .getCountryByCode(code)
              .pipe(map((res) => res[0] || null))
          : of(null);
      })
    ),
    { initialValue: null }
  );

  getLanguages(country: Country): string {
    return country.languages
      ? Object.values(country.languages).join(', ')
      : 'No disponible';
  }

  getCurrencies(country: Country): string {
    return country.currencies
      ? Object.values(country.currencies)
          .map((currency: any) => `${currency.name} (${currency.symbol})`)
          .join(', ')
      : 'No disponible';
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
