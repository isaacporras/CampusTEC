import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class HttpServicesService {

  constructor(private http: HttpClient) {
  }


  server = 'http://localhost:8080/CampusTEC_API_war_exploded';


  getUserDetails() {
    //post these details to API server to return user info is correct
  }

  getAssignments(token: string, semana) {
    let json = { token: token, semana: String(semana) };
    console.log(json);
    return this.http.post(this.server + '/planner/assignments/', json);
  }

  getChallenges(token) {
    let json = {
      token: token
    }
    return this.http.post(this.server + '/planner/challenges/', json)
  }
  postUpdateProfile(json) {
    let url = this.server + '/profile/edit';
    console.log(url);
    return this.http.post(url, json)
  }

  getActivities(token, week) {
    let json = {
      token: String(token),
      week: String(week)
    }
    return this.http.post(this.server + '/planner/activities', json)
  }

  authenticate(credentials: JSON) {
    return this.http.post(this.server + '/login', credentials);
  }

  getProfile(token: string) {
    let url = this.server + '/profile/';
    console.log('El url es:')
    console.log(url);
    let json = {
      token: token
    }
    return this.http.post(this.server + '/profile/', json);
  }

}
