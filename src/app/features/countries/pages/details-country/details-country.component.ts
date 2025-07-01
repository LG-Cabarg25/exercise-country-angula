import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-details-country',
  imports: [],
  template: `<p>details-country works!</p>`,
  styleUrl: './details-country.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsCountryComponent { }
