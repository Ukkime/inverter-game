import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classic-game',
  templateUrl: './classic-game.component.html',
  styleUrls: ['./classic-game.component.css'],
})
export class ClassicGameComponent implements OnInit {
  constructor() {
    this.grid = [];
    this.rawcode = '';
    this.route = '';
  }

  // Some config variables
  grid: string[][]; // Our game grid
  gameover: boolean = false; // Control when the game ends
  size: number = 5; // Cols an rows number (grid's size)
  shuffleLimit: number = 20; // Number of clicks to emulate when grid is generated
  coordinate: boolean = false; // Show coordinates (i massive recommend to desactivate in large grids)
  showrawcode: boolean = false; // Shows arrays and generating path for debug purposes
  rawcode: string; // Raw code (obviously xD)
  route: string; // Route to generate the actual game

  ngOnInit(): void {
    // Start the game
    this.startNewwGame();
  }

  // Generates new game when size is modfied
  changesize(): void {
    this.initGrid();
    this.startNewwGame();
  }

  // creates empty grid and fill it with 🟢(true) or 🔴(false)
  initGrid(): void {
    // Init grid
    this.grid = [];
    // choose 🟢(true) or 🔴(false) using math random with 50% of probability
    let fillvalue: string = Math.random() < 0.5 ? '🟢' : '🔴';

    // Save initial grid type in routepath
    this.route = 'Starts with ' + fillvalue + ' grid\n';

    // Fills array
    for (let i = 0; i < this.size; i++) {
      let row = [];
      for (let j = 0; j < this.size; j++) {
        row.push(fillvalue);
      }
      this.grid.push(row);
    }
  }

  // update clicked cell
  updateclicked(f: number, c: number): void {
    //Cheks if game is over
    if (!this.gameover) {
      // change cell value
      this.update(f, c);
      // Update route path
      this.route += '(' + f + ',' + c + ')';

      // checkNeighbors and change values
      this.checkNeighbors(f, c);

      // check if game is out
      this.checkWin();
    }
  }

  update(f: number, c: number): void {
    // invert cell value
    this.grid[f][c] = this.grid[f][c] == '🟢' ? '🔴' : '🟢';
  }

  checkNeighbors(f: number, c: number): void {
    // check neighbors positions and update
    if (
      f > 0 &&
      f < this.grid.length - 1 &&
      c > 0 &&
      c < this.grid[0].length - 1
    ) {
      this.update(f - 1, c);
      this.update(f - 1, c - 1);
      this.update(f + 1, c);
      this.update(f + 1, c + 1);
      this.update(f + 1, c - 1);
      this.update(f - 1, c + 1);
      this.update(f, c - 1);
      this.update(f, c + 1);
    } else if (f == 0 && c == 0) {
      this.update(f + 1, c);
      this.update(f + 1, c + 1);
      this.update(f, c + 1);
    } else if (f == 0 && c > 0 && c < this.grid[0].length - 1) {
      this.update(f + 1, c);
      this.update(f + 1, c + 1);
      this.update(f + 1, c - 1);
      this.update(f, c - 1);
      this.update(f, c + 1);
    } else if (
      f > 0 &&
      f < this.grid.length - 1 &&
      c == this.grid[0].length - 1
    ) {
      this.update(f + 1, c);
      this.update(f + 1, c - 1);
      this.update(f, c - 1);
      this.update(f - 1, c);
      this.update(f - 1, c - 1);
    } else if (f > 0 && c == 0 && f < this.grid.length - 1) {
      this.update(f + 1, c);
      this.update(f + 1, c + 1);
      this.update(f - 1, c + 1);
      this.update(f - 1, c);
      this.update(f, c + 1);
    } else if (f == 0 && c == this.grid[0].length - 1) {
      this.update(f, c - 1);
      this.update(f + 1, c - 1);
      this.update(f + 1, c);
    } else if (f == this.grid.length - 1 && c == this.grid[0].length - 1) {
      this.update(f - 1, c - 1);
      this.update(f - 1, c);
      this.update(f, c - 1);
    } else if (f == this.grid.length - 1 && c < this.grid[0].length - 1) {
      this.update(f - 1, c - 1);
      this.update(f - 1, c + 1);
      this.update(f - 1, c);
      this.update(f, c - 1);
      this.update(f, c + 1);
    }
  }

  checkWin(): boolean {
    // checks win (all cells are painted with the same color)
    let win_actives = this.checkWinActive();
    let win_inactives = this.checkWinInActive();
    return win_actives || win_inactives;
  }

  // check all cells are actives
  checkWinActive(): boolean {
    let win = true;
    for (let f = 0; f < this.grid.length; f++) {
      for (let c = 0; c < this.grid[f].length; c++) {
        win = this.grid[f][c] == '🟢' && win;
      }
    }
    if (win) {
      this.gameover = true;
    }
    return win;
  }

  // check all cells are inactives
  checkWinInActive(): boolean {
    let win = true;
    for (let f = 0; f < this.grid.length; f++) {
      for (let c = 0; c < this.grid[f].length; c++) {
        win = !(this.grid[f][c] == '🟢') && win;
      }
    }
    if (win) {
      this.gameover = true;
    }
    return win;
  }

  // Updates raw code
  // First generates an array with 🟢 🔴 values for debug in python solver
  // Second generates an array with 1 0 (binary) values for other debug purposes
  // At last, prints the generating path

  updaterawcode(): void {
    // 🟢 🔴 Array
    this.rawcode = '[\n';
    for (let f = 0; f < this.grid.length; f++) {
      this.rawcode += '  [';
      for (let c = 0; c < this.grid[f].length; c++) {
        if (this.grid[f][c] == '🟢') {
          this.rawcode += "'🟢',";
        } else {
          this.rawcode += "'🔴',";
        }
      }
      this.rawcode += '],\n';
    }
    this.rawcode += ']\n';

    // Binary array
    for (let f = 0; f < this.grid.length; f++) {
      this.rawcode += '';
      for (let c = 0; c < this.grid[f].length; c++) {
        if (this.grid[f][c] == '🟢') {
          this.rawcode += '1 ';
        } else {
          this.rawcode += '0 ';
        }
      }
      this.rawcode += '\n';
    }
    this.rawcode += '\n';

    this.rawcode += '\n' + this.route;
  }

  // starts new game
  startNewwGame(): void {
    this.gameover = false;
    this.initGrid();

    for (let s = 0; s < this.shuffleLimit; s++) {
      let randx = Math.floor(Math.random() * (this.size - 1 - 0 + 1)) + 0;
      let randy = Math.floor(Math.random() * (this.size - 1 - 0 + 1)) + 0;
      this.updateclicked(randx, randy);
    }

    this.updaterawcode();

    if (this.checkWin()) {
      this.startNewwGame();
    }
  }

  getCustomColorsScheme(active: boolean) {
    if (active) {
      return localStorage.getItem('colors') != null
        ? localStorage.getItem('colors') + '-active'
        : '';
    } else {
      return localStorage.getItem('colors') != null
        ? localStorage.getItem('colors') + '-inactive'
        : '';
    }
  }
}
