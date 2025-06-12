import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Player = 'X' | 'O';
type Cell = Player | null;
type GameStatus = 'playing' | 'won' | 'draw';

@Component({
  selector: 'app-tictactoe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css']
})
export class TicTacToeComponent {
  // Game state
  board: Cell[][] = Array(3).fill(null).map(() => Array(3).fill(null));
  currentPlayer: Player = 'X';
  gameStatus: GameStatus = 'playing';
  winner: Player | null = null;

  // PUBLIC_INTERFACE
  /**
   * Makes a move at the specified position if valid
   * @param row The row index (0-2)
   * @param col The column index (0-2)
   */
  makeMove(row: number, col: number): void {
    // Return if cell is already taken or game is over
    if (this.board[row][col] || this.gameStatus !== 'playing') {
      return;
    }

    // Make the move
    this.board[row][col] = this.currentPlayer;

    // Check for win or draw
    if (this.checkWin()) {
      this.gameStatus = 'won';
      this.winner = this.currentPlayer;
    } else if (this.checkDraw()) {
      this.gameStatus = 'draw';
    } else {
      // Switch players
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Resets the game to its initial state
   */
  resetGame(): void {
    this.board = Array(3).fill(null).map(() => Array(3).fill(null));
    this.currentPlayer = 'X';
    this.gameStatus = 'playing';
    this.winner = null;
  }

  /**
   * Checks if the current player has won
   */
  private checkWin(): boolean {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] === this.currentPlayer &&
        this.board[i][1] === this.currentPlayer &&
        this.board[i][2] === this.currentPlayer
      ) {
        return true;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        this.board[0][i] === this.currentPlayer &&
        this.board[1][i] === this.currentPlayer &&
        this.board[2][i] === this.currentPlayer
      ) {
        return true;
      }
    }

    // Check diagonals
    if (
      this.board[0][0] === this.currentPlayer &&
      this.board[1][1] === this.currentPlayer &&
      this.board[2][2] === this.currentPlayer
    ) {
      return true;
    }

    if (
      this.board[0][2] === this.currentPlayer &&
      this.board[1][1] === this.currentPlayer &&
      this.board[2][0] === this.currentPlayer
    ) {
      return true;
    }

    return false;
  }

  /**
   * Checks if the game is a draw
   */
  private checkDraw(): boolean {
    return this.board.every(row => row.every(cell => cell !== null));
  }
}
