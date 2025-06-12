import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicTacToeComponent } from './tictactoe/tictactoe.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TicTacToeComponent],
  template: '<app-tictactoe></app-tictactoe>',
  styleUrl: './app.component.css'
})
export class AppComponent {}
