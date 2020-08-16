import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {

  constructor(private http: HttpClient) { }

  server = "http://localhost:8080";

  getUserDetails(){
    //post these details to API server to return user info is correct
  }

  getTareas(semana: number){
    return this.http.get(this.server + "/CampusTEC_API_war_exploded/login");
  }
}
