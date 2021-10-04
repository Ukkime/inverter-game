import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-miniature',
  templateUrl: './miniature.component.html',
  styleUrls: ['./miniature.component.css'],
})
export class MiniatureComponent implements OnInit {
  public p_dissplay_board: any;
  public size = 6;
  public grid: any;
  public colors: string;

  constructor() {}

  ngOnInit(): void {
    this.colors = localStorage.getItem('colors') ?? '';
    this.startNewwGame();
  }

  updateColors() {
    localStorage.setItem('colors', this.colors);
  }

  getCustomColorsScheme(active: boolean) {
    if (active) {
      return localStorage.getItem('colors') ?? '' + '-active';
    } else {
      return localStorage.getItem('colors') ?? '' + '-inactive';
    }
  }

  // creates empty grid and fill it with 🟢(true) or 🔴(false)
  initGrid(): void {
    // Init grid
    this.grid = [];
    // choose 🟢(true) or 🔴(false) using math random with 50% of probability
    let fillvalue: boolean = Math.random() < 0.5 ? true : false;

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
    // change cell value
    this.update(f, c);
    // checkNeighbors and change values
    this.checkNeighbors(f, c);
  }

  update(f: number, c: number): void {
    // invert cell value
    this.grid[f][c] = this.grid[f][c] == true ? false : true;
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

  // starts new game
  startNewwGame(): void {
    this.initGrid();

    for (let s = 0; s < 10; s++) {
      let randx = Math.floor(Math.random() * (this.size - 1 - 0 + 1)) + 0;
      let randy = Math.floor(Math.random() * (this.size - 1 - 0 + 1)) + 0;
      this.updateclicked(randx, randy);
    }
  }
}
