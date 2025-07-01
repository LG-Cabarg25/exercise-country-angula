import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-search-box',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, IftaLabelModule],
  template: `
    <p-iftalabel class="w-full">
      <input
        type="text"
        pInputText
        id="search"
        [(ngModel)]="inputValue"
        (keyup.enter)="emitValue(inputValue)"
        class="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-800"
        autocomplete="off"
      />
      <label for="search">{{ placeholder }}</label>
    </p-iftalabel>
  `,
  styles: [],
})
export class SearchBoxComponent {
  @Input()
  placeholder: string = 'Buscar...';

  @Output()
  onValue = new EventEmitter<string>();

  inputValue: string = '';

  emitValue(value: string): void {
    this.onValue.emit(value.trim());
  }
}
