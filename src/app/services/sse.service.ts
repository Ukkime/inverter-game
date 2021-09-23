import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private endpoint;
  private _eventSource: EventSource;

  constructor(private _zone: NgZone) {
    this.endpoint = 'https://invertergameapi.azurewebsites.net';
  }

  getServerSentEvent(gameid: string, playerid: string): Observable<any> {
    return Observable.create((observer: any) => {
      this._eventSource = this.getEventSource(
        this.endpoint + 'inverter/game/subscribe/' + gameid + '/' + playerid
      );

      this._eventSource.onmessage = (event: any) => {
        this._zone.run(() => {
          observer.next(event);
        });
      };

      this._eventSource.onerror = (error: any) => {
        this._zone.run(() => {
          observer.error(error);
          this._eventSource.close();
        });
      };
    });
  }

  private getEventSource(url: string): EventSource {
    return new EventSource(url);
  }

  public stopEventSource() {
    this._eventSource.close();
  }
}
