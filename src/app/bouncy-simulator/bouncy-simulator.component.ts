import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bouncy-simulator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bouncy-simulator.component.html',
  styleUrl: './bouncy-simulator.component.scss',
})
export class BouncySimulatorComponent implements OnInit {
  board: string[][];
  ballPosition: { x: number; y: number };
  direction: { x: number; y: number };

  ExampleInput = [
    ['Y', '0', 'X'],
    ['0', '1', '0'],
    ['X', '0', 'Y'],
  ];

  constructor() {
    this.board = this.ExampleInput;
    this.ballPosition = this.getInitialBallPosition();
    this.direction = this.getRandomDirection();
  }

  ngOnInit(): void {
    this.startSimulation();
  }

  getInitialBallPosition() {
    const corners = [
      { x: 0, y: 0 },
      { x: 0, y: this.board[0].length - 1 },
      { x: this.board.length - 1, y: 0 },
      { x: this.board.length - 1, y: this.board[0].length - 1 },
    ];
    return corners[Math.floor(Math.random() * corners.length)];
  }

  getRandomDirection() {
    const directions = [
      { x: 0, y: 1 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
      { x: -1, y: 0 },
    ];
    return directions[Math.floor(Math.random() * directions.length)];
  }

  startSimulation() {
    setInterval(() => this.moveBall(), 500);
  }

  moveBall() {
    let newX = this.ballPosition.x + this.direction.x;
    let newY = this.ballPosition.y + this.direction.y;

    if (this.isWithinBounds(newX, newY)) {
      if (this.board[newX][newY] === 'X') {
        this.changeDirection();
      } else if (this.board[newX][newY] === 'Y') {
        this.board[newX][newY] = '0';
        this.changeDirection();
      }
      this.ballPosition.x = newX;
      this.ballPosition.y = newY;
    } else {
      this.changeDirection();
    }
  }

  isWithinBounds(x: number, y: number) {
    return (
      x >= 0 && x < this.board.length && y >= 0 && y < this.board[0].length
    );
  }

  changeDirection() {
    const previousDirection = this.direction;
    do {
      this.direction = this.getRandomDirection();
    } while (
      this.direction.x === -previousDirection.x &&
      this.direction.y === -previousDirection.y
    );
  }
}
