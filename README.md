# Bouncing Simulator

A bouncingl simulator implemented in Angular. The ball moves diagonally across a grid, bouncing off walls and changing direction upon hitting certain obstacles.

## Features
- The ball starts from a position marked with '1' and moves diagonally.
- When the ball hits a 'Y', it changes direction randomly and 'Y' turns into '0'.
- The ball bounces off walls ('X') and changes direction.
- The board configuration can vary, and the ball adjusts accordingly.

## Getting Started

### Prerequisites
- Node.js (>= 12.x)
- Angular CLI (>= 12.x)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/OlesiaKubska/bouncing-simulator.git
    cd bouncing-simulator
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

1. Start the development server:
    ```bash
    ng serve
    ```

2. Open your browser and navigate to:
    ```
    http://localhost:4200
    ```

## Usage

1. The ball starts at a corner position marked with '1'.
2. It moves diagonally and interacts with obstacles ('X' and 'Y') as per the defined logic.
3. The simulation can be observed in the browser.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Inspired by classic bouncy ball simulations and grid-based games.
