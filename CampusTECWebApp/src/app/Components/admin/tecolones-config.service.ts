import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TecolonesConfigService {

  constructor() { }

  postTecolones(json){
    console.log('Se va a postear los tecolones')
  }
}
