import { Injectable,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HomeService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMock(): Observable<{ payload: any[] }> {
    const url = `${this.url}/${environment.mockUrl}`;
    return this.http.get<{ payload: any }>(url, { params: {} });
  }

  getFromApi(): Observable<any> {
    const url = `https://randomuser.me/api/`;
    return this.http.get<any>(url, { params: {} });
  }

}
