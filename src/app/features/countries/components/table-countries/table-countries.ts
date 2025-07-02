import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Country } from '../../../../core/models';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { SearchBoxComponent } from '../../../../shared/components/search/search';
import { SelectedOptionComponent } from '../../../../shared/components/selected-option/selected-option';
import { CountryStore } from '../../state/countryStore';

@Component({
  selector: 'app-table-countries',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    SearchBoxComponent,
    SelectedOptionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class=" text-yellow-400 p-12 rounded-lg shadow-lg w-full overflow-visible relative z-50"
    >
      <br />
      <div class="flex flex-col md:flex-row md:items-end gap-4 mb-6 p-12">
        <shared-search-box
          placeholder="Buscar país por nombre"
          class="w-full md:w-1/3"
          (onValue)="onSearchByName($event, dt)"
        />
        <shared-search-box
          placeholder="Buscar país por capital"
          class="w-full md:w-1/3"
          (onValue)="onSearchByCapital($event, dt)"
        />
        <div class="w-full md:w-1/3">
          <label
            class="block text-sm mb-1 text-[#aaa221] font-medium text-center md:text-left"
          >
            Filtrar por región:
          </label>
          <app-selected-option (onSelect)="onRegionSelect($event)" />
        </div>
      </div>
      <br />
      <p-table
        #dt
        [value]="countries"
        [(selection)]="selectedCountry"
        [paginator]="true"
        [rows]="10"
        [rowsPerPageOptions]="[10, 25, 50]"
        [globalFilterFields]="[]"
        selectionMode="single"
        (onRowSelect)="onRowClick($event.data)"
        [tableStyle]="{ 'min-width': '100%' }"
        styleClass="p-datatable-sm p-datatable-striped bg-gray-800 text-white rounded-lg"
      >
        <ng-template pTemplate="header">
          <tr class="bg-green-500">
            <th pSortableColumn="name.common">
              Nombre <p-sortIcon field="name.common" />
            </th>
            <th pSortableColumn="capital">
              Capital <p-sortIcon field="capital" />
            </th>
            <th pSortableColumn="region">
              Región <p-sortIcon field="region" />
            </th>
            <th pSortableColumn="population">
              Población <p-sortIcon field="population" />
            </th>
            <th>Bandera</th>
          </tr>
        </ng-template>

        <ng-template pTemplate="body" let-country>
          <tr
            class="hover:bg-[#aaa221] cursor-pointer"
            (click)="onRowClick(country)"
          >
            <td class="py-2">{{ country.name.common }}</td>
            <td class="py-2">{{ country.capital?.[0] }}</td>
            <td class="py-2">{{ country.region }}</td>
            <td class="py-2">{{ country.population | number }}</td>
            <td class="py-2">
              <img
                [src]="country.flags.png"
                width="40"
                class="rounded shadow"
              />
            </td>
          </tr>
        </ng-template>

        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="5" class="text-center py-4 text-gray-500">
              No se encontraron países.
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
})
export class TableCountriesComponent {
  @Input() countries: Country[] = [];

  selectedCountry: Country | null = null;

  private store = inject(CountryStore);

  constructor(private router: Router) {}

  onSearchByName(value: string, table: any): void {
    table.filter(value, 'name.common', 'contains');
  }

  onSearchByCapital(value: string, table: any): void {
    table.filter(value, 'capital', 'contains');
  }

  onRegionSelect(region: string): void {
    this.store.setRegionFilter(region);
    this.store.searchByRegion(region);
  }

  onRowClick(country?: Country | Country[]) {
    if (!country || Array.isArray(country)) return;
    console.log('Navegando a:', country.cca3);
    this.router.navigate(['/details', country.cca3]);
  }
}
