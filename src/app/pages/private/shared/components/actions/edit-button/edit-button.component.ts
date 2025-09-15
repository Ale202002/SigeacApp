import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-edit-button',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  template: `
    <button 
      (click)="onEdit()"
      class="p-2 rounded-full transition-all duration-200 hover:bg-gray-200 group"
      [disabled]="disabled"
      style="color: #555555;">
      <i class="pi pi-pencil text-sm group-hover:text-blue-600 transition-colors duration-200"
         [class.opacity-50]="disabled"></i>
    </button>
  `
})
export class EditButtonComponent<T = any> {
  @Input() item!: T;
  @Input() tooltip: string = 'Editar';
  @Input() disabled: boolean = false;
  
  @Output() edit = new EventEmitter<T>();

  onEdit() {
    if (!this.disabled) {
      this.edit.emit(this.item);
    }
  }
}