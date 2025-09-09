import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from '@pages/private/shared/menu-bar/menu-bar';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuBarComponent
  ],
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class MainComponent {}