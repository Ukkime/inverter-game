import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
  providers: [ApiService],
})
export class RankingComponent implements OnInit {
  public rankingList: any[];

  constructor(private _apiService: ApiService) {
    this.rankingList = [];
  }

  ngOnInit(): void {
    this.getRanking();
  }

  getRanking() {
    this._apiService.getRanking().subscribe(
      (response) => {
        this.rankingList = response;
      },
      (error) => {
        console.log('Error en la petición:' + error);
      }
    );
  }
}
