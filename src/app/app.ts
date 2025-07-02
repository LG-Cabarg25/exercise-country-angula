import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { FooterComponent } from './shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-gray-100 text-gray-800 items-center px-4 py-10">
      <div class="w-full  mx-auto relative ">
        <app-navbar />
      </div>
      <router-outlet />
      <div class="w-full  mx-auto relative mt-10">
        <app-footer />
      </div>
    </div>
  `,
  styleUrl: './app.css',
})
export class App {
  protected title = 'countries-guss-exercise';
}
