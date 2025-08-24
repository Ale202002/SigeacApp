
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { CascadeSelectModule } from 'primeng/cascadeselect';

import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/User.model';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    TagModule,
  CascadeSelectModule,],
  selector: 'app-table-component',
  templateUrl: './table.component.html',
})


export class TableComponent {
  userService = inject(UserService);
  searchValue: string = '';
  usuarios: User[] = [];
    
  constructor() {
    this.userService.listar().subscribe((users: User[]) => {
      this.usuarios = users;
    });
  }

  onEdit(user: User) {
    // Lógica para editar usuario (puedes abrir un modal, navegar, etc.)
    console.log('Editar usuario:', user);
  }

  onDelete(user: User) {
    // Lógica para eliminar usuario (puedes mostrar confirmación, llamar al servicio, etc.)
    console.log('Eliminar usuario:', user);
  }
}
 