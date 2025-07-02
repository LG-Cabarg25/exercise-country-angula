import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  template: `
    <nav
      class="w-full bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 text-yellow-400 px-6 py-4 flex items-center justify-center shadow-md"
    >
      <div class="flex items-center space-x-3">
        <img src="/img/mundi.png" alt="Logo" class="h-24 w-auto" />
      </div>
      <h1
        class="text-3xl font-extrabold md:text-2xl tracking-wide bg-gradient-to-r from-yellow-400 via-pink-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg"
      >
        Mapamundi - de Guss
      </h1>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {}
