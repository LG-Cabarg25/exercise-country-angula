import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-selected-option',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectButtonModule],
  template: `
    <div class="w-full max-w-xl mx-auto mt-4">
      <div class="">
        <p-selectButton
          [options]="regionOptions"
          [(ngModel)]="selectedValue"
          optionLabel="label"
          optionValue="value"
          (onChange)="onChangeValue()"
          class=" border border-gray-300 rounded-lg shadow-sm p-3"
        />
      </div>
    </div>
  `,
})
export class SelectedOptionComponent {
  @Input() selectedValue: string = '';
  @Output() onSelect = new EventEmitter<string>();

  regionOptions = [
    { label: 'África', value: 'africa' },
    { label: 'América', value: 'americas' },
    { label: 'Asia', value: 'asia' },
    { label: 'Europa', value: 'europe' },
    { label: 'Oceanía', value: 'oceania' },
  ];

  onChangeValue() {
    this.onSelect.emit(this.selectedValue);
  }
}
