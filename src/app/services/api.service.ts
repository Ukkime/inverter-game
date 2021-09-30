import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// import 'rxjs/add/operator/retry'; // don't forget the imports

@Injectable()
export class ApiService {
  endpoint = 'https://invertergameapi.azurewebsites.net/';

  constructor(private http: HttpClient) {}

  createGame(username: string) {
    if (localStorage.getItem('userid') != null) {
      return this.http
        .get(
          this.endpoint +
            'inverter/game/creategamebyid/' +
            localStorage.getItem('userid') +
            '/' +
            username
        )
        .pipe(map((response: any) => response));
    } else {
      return this.http
        .get(this.endpoint + 'inverter/game/creategame/' + username)
        .pipe(map((response: any) => response));
    }
  }

  getRanking() {
    return this.http
      .get(this.endpoint + 'inverter/game/getranking')
      .pipe(map((response: any) => response));
  }

  searchGame(username: string) {
    if (localStorage.getItem('userid') != null) {
      return this.http
        .get(
          this.endpoint +
            'inverter/game/searchgamebyid/' +
            localStorage.getItem('userid') +
            '/' +
            username
        )
        .pipe(map((response: any) => response));
    } else {
      return this.http
        .get(this.endpoint + 'inverter/game/searchGame/' + username)
        .pipe(map((response: any) => response));
    }
  }

  sendClick(gameid: string, playerid: string, x: number, y: number) {
    return this.http
      .get(
        this.endpoint +
          'inverter/game/sendclick/' +
          gameid +
          '/' +
          playerid +
          '/' +
          x +
          '/' +
          y
      )
      .pipe(map((response: any) => response));
  }
}
