import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CampusTEC';

  credentialsForm = new FormGroup({
    id : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });

  onLogIn(){
    console.log(JSON.stringify(this.credentialsForm.value, null, 4));
  }



}
