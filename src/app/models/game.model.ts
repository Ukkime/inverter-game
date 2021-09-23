export class Game {
  private _game_id: string;
  private _player_id: string;
  private _player_name: string;

  private _player_score: number;
  private _opponent_score: number;

  private _opponent_name: string;

  public _player_board: any[];
  public _opponent_board: any[];

  public startTime: string;
  public endTime: string;

  public last_player_board: string;
  public last_opponent_board: string;

  public active;

  constructor() {
    this.active = false;
  }

  start(gid: string, pid: string, pname: string) {
    this._game_id = gid;
    this._player_id = pid;
    this._player_name = pname;
    this._opponent_name = '';

    this._player_board;
    this._opponent_board;
    this.active = true;

  }

  updateGame(player_board: string, opponent_board: string) {
    let total: number = 6 * 6;
    let pcount = 0;
    let ocount = 0;

    let p_data: string[] = player_board.split('.');
    let o_data: string[] = opponent_board.split('.');

    let tmp_player_board = [];
    let tmp_opponent_board = [];

    if (this.last_player_board != player_board) {
      this.last_player_board  = player_board;
      // Fills array
      for (let i = 0; i < 6; i++) {
        let row = [];
        for (let j = 0; j < 6; j++) {
          row.push(p_data[i][j] == '1');
          if (p_data[i][j] == '1') {
            pcount++;
          }
        }
        tmp_player_board.push(row);
      }
      this._player_board = tmp_player_board;
      let p_preScore = (((pcount * 100) / total + Number.EPSILON) * 100) / 100;
      this._player_score = p_preScore > 50 ? p_preScore : 100 - p_preScore;
    }

    if (this.last_opponent_board != opponent_board) {
      this.last_opponent_board == opponent_board;
      // Fills array
      for (let i = 0; i < 6; i++) {
        let row = [];
        for (let j = 0; j < 6; j++) {
          row.push(o_data[i][j] == '1');
          if (o_data[i][j] == '1') {
            ocount++;
          }
        }
        tmp_opponent_board.push(row);
      }
      this._opponent_board = tmp_opponent_board;
      let o_preScore = (((ocount * 100) / total + Number.EPSILON) * 100) / 100;
      this._opponent_score = o_preScore > 50 ? o_preScore : 100 - o_preScore;
    }
  }

  setOpponent(oname: string) {
    this._opponent_name = oname;
  }

  getPlayerName() {
    return this._player_name;
  }

  getOpponentName() {
    return this._opponent_name;
  }

  getPlayerid() {
    return this._player_id;
  }

  gameid() {
    return this._game_id;
  }

  getPlayerScore() {
    return Math.round(this._player_score);
  }

  getOpponentScore() {
    return Math.round(this._opponent_score);
  }
}
