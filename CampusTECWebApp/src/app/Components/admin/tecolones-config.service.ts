import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TecolonesConfigService {
  server = 'http://localhost:8080/CampusTEC_API_war_exploded';

  constructor(private http: HttpClient) { }

  postTecolones(json){
    console.log(json)
    return this.http.post(this.server + '/admin/setTecolones', json);
  }

  getTecolones(){
    return this.http.get(this.server + '/admin/tecolones');
  }
}
