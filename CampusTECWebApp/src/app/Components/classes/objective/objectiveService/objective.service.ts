import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObjectiveService {

  constructor(private http: HttpClient) { }

  server = 'http://localhost:8080/CampusTEC_API_war_exploded';
postObjective(json){
  this.http.post(this.server + '/classes/objectives/new', json);
}


}


