import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div class="bg-white w-full max-w-md rounded shadow-lg border relative px-8 py-6">
        <h3 class="text-xl font-semibold mb-4 text-gray-800">{{ title }}</h3>
        
        <p class="text-gray-600 mb-6">{{ message }}</p>
        
        <div class="flex gap-3">
          <button 
            type="button" 
            class="flex-1 border border-red-500 text-red-500 hover:bg-red-50 font-semibold py-2 rounded transition"
            (click)="onCancel()">
            {{ cancelText }}
          </button>
          <button 
            type="button" 
            class="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition"
            (click)="onConfirm()">
            {{ confirmText }}
          </button>
        </div>

        <button 
          type="button" 
          (click)="onCancel()" 
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <i class="pi pi-times text-lg"></i>
        </button>
      </div>
    </div>
  `
})
export class ConfirmationDialogComponent {
  @Input() visible = false;
  @Input() title = 'Confirmar acción';
  @Input() message = '¿Estás seguro/a que deseas continuar?';
  @Input() confirmText = 'Confirmar';
  @Input() cancelText = 'Cancelar';
  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}