import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {

  constructor(private http: HttpClient) { }

  server = 'http://localhost:8080/CampusTEC_API_war_exploded';
  postObjective(json) {
    let  url = this.server + '/classes/objectives/new';
    console.log(url)
    console.log(json)
    return this.http.post(url, json);
  }


}


