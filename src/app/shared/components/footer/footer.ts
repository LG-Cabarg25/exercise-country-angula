import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer
      class="w-full text-center py-4 bg-gray-900 text-gray-300 text-sm mt-auto"
    >
      © {{ year }} Gustavo Cabrera. Todos los derechos reservados.
    </footer>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
