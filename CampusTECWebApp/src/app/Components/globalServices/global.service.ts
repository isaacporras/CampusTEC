import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  downloadFile(route: string, filename: string = null): any {


    const token = 'my JWT';
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + token);
    return this.http.get(route, { headers, responseType: 'blob' as 'json' })
  }
}
