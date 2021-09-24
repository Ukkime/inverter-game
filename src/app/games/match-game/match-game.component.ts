import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SseService } from '../../services/sse.service';
import { ApiService } from '../../services/api.service';
import { Game } from '../../models/game.model';
import Moment from 'moment';

@Component({
  selector: 'app-match-game',
  templateUrl: './match-game.component.html',
  styleUrls: ['./match-game.component.css'],
  providers: [ApiService],
})
export class MatchGameComponent implements OnInit {
  private countEventsSubscription$: Subscription;
  public game: Game;
  public username: string;
  public validusername: boolean;
  public waiting: boolean;
  public playing: boolean;
  public winner: string;
  public searching: boolean;
  public gamenotfound: boolean;
  public waiting_for_response;

  public p_dissplay_board;

  constructor(private _apiService: ApiService, private sseService: SseService) {
    this.username = '';
    this.validusername = false;
    this.waiting = false;
    this.playing = false;
    this.game = new Game();
    this.winner = '';
    this.searching = false;
    this.gamenotfound = false;
    this.waiting_for_response = false;
  }

  ngOnInit(): void {}

  checkusername() {
    this.validusername = true;
    if (this.username.indexOf(' ') > 0) {
      this.validusername = false;
    } else if (this.username.length > 15) {
      this.validusername = false;
    } else if (this.username.length < 3) {
      this.validusername = false;
    }
  }

  createGame() {
    this.waiting_for_response = true;
    this.gamenotfound = false;
    this.winner = '';
    this.waiting = true;
    this._apiService.createGame(this.username).subscribe(
      (response) => {
        this.countEventsSubscription$ = this.sseService
          .getServerSentEvent(response.game_id, response.player_id)
          .subscribe((event) => {
            this.waiting_for_response = false;
            try {
              let data = JSON.parse(event.data);

              if (!this.game.active) {
                this.game.start(
                  response.game_id,
                  response.player_id,
                  response.player_name
                );
              } else {
                if (data.player1_board != null) {
                  this.game.setOpponent(data.player2_name);
                  this.game.updateGame(data.player1_board, data.player2_board);
                  this.p_dissplay_board = this.game._player_board;
                }
                this.game.startTime = data.start_time;
                this.game.endTime = data.end_time;
                this.playing = true;
                this.waiting = false;
                if (data.winner != null) {
                  this.winner = data.winner;
                }
              }
            } catch (exception) {
              console.log(exception);
            }
          });
      },
      (error) => {
        console.log('Error en la petición:' + error);
      }
    );
  }

  searchGame() {
    if (!this.waiting_for_response) {
      this.waiting_for_response = true;
      this.winner = '';
      this.searching = true;
      this.gamenotfound = false;
      this._apiService.searchGame(this.username).subscribe(
        (response) => {
          if (response.game_id != '') {
            this.searching = false;
            this.waiting = true;
            this.countEventsSubscription$ = this.sseService
              .getServerSentEvent(response.game_id, response.player2_id)
              .subscribe((event) => {
                this.waiting_for_response = false;
                try {
                  let data = JSON.parse(event.data);

                  if (!this.game.active) {
                    this.game.start(
                      response.game_id,
                      response.player2_id,
                      response.player2_name
                    );
                    this.game.setOpponent(data.player1_name);
                  } else {
                    if (data.player1_board != null) {
                      this.game.updateGame(
                        data.player2_board,
                        data.player1_board
                      );
                      this.p_dissplay_board = this.game._player_board;
                    }
                    this.game.startTime = data.start_time;
                    this.game.endTime = data.end_time;
                    this.waiting = false;
                    this.playing = true;
                    if (data.winner != null) {
                      this.winner = data.winner;
                    }
                  }
                } catch (exception) {
                  console.log(exception);
                }
              });
          } else {
            this.searching = false;
            this.waiting = false;
            this.gamenotfound = true;
            this.createGame();
          }
        },
        (error) => {
          console.log('Error en la petición:' + error);
        }
      );
    }
  }

  stopGame() {
    this.sseService.stopEventSource();
    this.game = new Game();
    this.waiting = false;
    this.playing = false;
  }

  updateclicked(f: number, c: number): void {
    console.log(f + ' ' + c);
    this._apiService
      .sendClick(this.game.gameid(), this.game.getPlayerid(), f, c)
      .subscribe(
        (response) => {
          // console.log(response);
        },
        (error) => {
          console.log('Error en la petición:' + error);
        }
      );
  }

  calculateSeconds() {
    let seconds = Math.round((Moment().diff(this.game.endTime) / 1000) * -1);
    return seconds >= 0 ? seconds : 0;
  }
}
