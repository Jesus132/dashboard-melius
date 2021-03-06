import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Widgets } from 'src/app/data/interfaces/Widgets.interface';
import { environment } from 'src/environments/environment';

interface AllWidgets {
  id?: number,
  widgets?: Widgets[],
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // socket: any;

  public API = environment.api;

  public Indexwidgets: number = 0;
  public widgets: Widgets[] = [];

  public Allwidgets: AllWidgets[] = [];// Lista principar que tendra toda la info de la malla

  constructor(
    private http: HttpClient
  ) {
    // this.socket = io('http://localhost:3000/');
  }

  getRickMorty(page: number): Observable<any> {
    return this.http.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
  }

  getTemp(): Observable<any> {
    // const API = 'https://API.jesus132.repl.co';
    // const API = `https://api.covidtracking.com/v1/states/daily.json`;
    // https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&units=metric&appid=d68cda3d7e7279fd45b6bd0b0155df82
    return this.http.get(this.API);
  }

  // Listen(Eventname: string): Observable<soketChart> {
  //   return new Observable((Subscriber) => {
  //     this.socket.on(Eventname, (data => {
  //       Subscriber.next(data);
  //     }))
  //   })
  // }

}