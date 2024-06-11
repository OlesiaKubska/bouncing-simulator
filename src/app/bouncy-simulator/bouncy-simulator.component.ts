import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ExampleInput } from './ExampleInput';

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
  intervalId: number | undefined;
  isBrowser: boolean;
  moveCount: number;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    // console.log('BouncySimulatorComponent constructed');
    this.board = ExampleInput;
    // console.log('Board:', JSON.stringify(this.board));
    this.ballPosition = this.getInitialBallPosition();
    // console.log('Initial Ball Position:', JSON.stringify(this.ballPosition));
    this.direction = { x: 1, y: 1 };
    console.log('Initial Direction:', JSON.stringify(this.direction));
    this.moveCount = 0;
  }

  ngOnInit(): void {
    // console.log('BouncySimulatorComponent initialized');
    if (this.isBrowser) {
      this.startSimulation();
    }
  }

  getInitialBallPosition() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === '1') {
          return { x: i, y: j };
        }
      }
    }

    return { x: 0, y: 0 };
  }

  startSimulation() {
    console.log('Starting simulation');
    this.intervalId = window.setInterval(() => this.moveBall(), 500);
  }

  moveBall() {
    console.log('Moving ball');
    let newX = this.ballPosition.x + this.direction.x;
    let newY = this.ballPosition.y + this.direction.y;

    if (this.isWithinBounds(newX, newY)) {
      if (this.board[newX][newY] === 'X') {
        console.log('Hit X, changing direction');
        this.changeDirection(true);
      } else if (this.board[newX][newY] === 'Y') {
        console.log('Hit Y, changing direction and turning Y into 0');
        this.board[newX][newY] = '0';
        this.changeDirection(false);
      } else {
        this.ballPosition.x = newX;
        this.ballPosition.y = newY;
        console.log('Ball moved to:', JSON.stringify(this.ballPosition));
      }
    } else {
      console.log('Out of bounds, changing direction');
      this.changeDirection(false);
    }

    this.moveCount++;
    if (this.moveCount > 100) {
      console.log('Too many moves, stopping the ball to prevent infinite loop');
      if (this.intervalId !== undefined) {
        clearInterval(this.intervalId);
      }
    }
  }

  isWithinBounds(x: number, y: number) {
    return (
      x >= 0 && x < this.board.length && y >= 0 && y < this.board[0].length
    );
  }

  changeDirection(hitX: boolean) {
    const previousDirection = this.direction;
    const directions = [
      { x: 1, y: 1 },
      { x: 1, y: -1 },
      { x: -1, y: 1 },
      { x: -1, y: -1 },
    ];

    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }

    let newDirectionFound = false;

    for (let newDirection of directions) {
      const newX = this.ballPosition.x + newDirection.x;
      const newY = this.ballPosition.y + newDirection.y;

      if (
        newDirection.x !== -previousDirection.x &&
        newDirection.y !== -previousDirection.y &&
        this.isWithinBounds(newX, newY) &&
        (!hitX || this.board[newX][newY] !== 'X')
      ) {
        this.direction = newDirection;
        newDirectionFound = true;
        break;
      }
    }

    if (!newDirectionFound) {
      for (let newDirection of directions) {
        const newX = this.ballPosition.x + newDirection.x;
        const newY = this.ballPosition.y + newDirection.y;

        if (this.isWithinBounds(newX, newY)) {
          this.direction = newDirection;
          newDirectionFound = true;
          break;
        }
      }
    }

    if (!newDirectionFound && this.intervalId !== undefined) {
      clearInterval(this.intervalId);
    }
  }
}
