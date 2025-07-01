import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-spinner-load',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  template: `
    <div
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-700/70"
    >
      <p-progress-spinner
        strokeWidth="6"
        animationDuration=".8s"
        [style]="{ width: '60px', height: '60px' }"
      ></p-progress-spinner>
    </div>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerLoadComponent {}
