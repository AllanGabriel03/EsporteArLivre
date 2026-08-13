import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './component/menu/menu';
import { Atleta } from './component/atleta/atleta';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, Atleta],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('esporteArLivre');
}
