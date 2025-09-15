import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  template: `
    <button 
      (click)="onDelete()"
      class="p-2 rounded-full transition-all duration-200 hover:bg-gray-200 group"
      [disabled]="disabled"
      style="color: #555555;">
      <i class="pi pi-trash text-sm group-hover:text-red-600 transition-colors duration-200"
         [class.opacity-50]="disabled"></i>
    </button>
  `
})
export class DeleteButtonComponent<T = any> {
  @Input() item!: T;
  @Input() tooltip: string = 'Eliminar';
  @Input() disabled: boolean = false;
  
  @Output() delete = new EventEmitter<T>();

  onDelete() {
    if (!this.disabled) {
      this.delete.emit(this.item);
    }
  }
}